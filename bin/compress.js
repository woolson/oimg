const fs = require("fs")
const yargs = require("yargs")
const path = require("path")
const columnify = require("columnify")
const imagemin = require("imagemin")
const imageminJpeg = require("imagemin-jpegoptim")
const imageminPng = require("imagemin-pngquant")
const imageminGif = require("imagemin-gifsicle")
const imageminSvg = require("imagemin-svgo")
const list = require("./list.js").list
const {
	getArgv,
	filterFile,
	getFolderImg
} = require("./utils.js")
const cp = process.cwd()

exports.compress = compress
exports.handler = compress
exports.command = "compress"
exports.describe = "compress select image"
exports.builder = () => {
	yargs
		.alias("c", "compress")
		.option("i", {
			alias: "ignore",
			description: "files will be ignore",
		})
		.option("q", {
			alias: "quality",
			description: "compress quality",
		})
		.help("h")
		.alias("h", "help")
}

function compress() {
	const args = getArgv(process.argv)
	const quality = args.quality || 6
	const cPath = args.path ? path.resolve(args.path[0]) : cp
	const images = filterFile(
		getFolderImg(cPath),
		args.ignore || [],
		imgPath => imgPath.indexOf(".compress.") === -1
	)
	const formatQuality = {
		hundred: `${(quality - 1) * 10}-${quality * 10}`,
		forGif: parseInt(quality / 10 * 3),
	}

	imagemin(images, "dist", {
		plugins: [
			imageminJpeg({quality: formatQuality.hundred}),
			imageminPng({quality: formatQuality.hundred}),
			imageminGif({optimizationLevel: formatQuality.forGif}),
		]
	}).then(files => {
		// move file to current folder
		files.forEach(item => {
			const fileParse = path.parse(path.join(cp, item.path))
			const {name, ext, base, dir} = fileParse
			const newName = `${name}.compress${ext}`
			fs.renameSync(`${dir}/${base}`, newName)
		})

		// delete generated folder
		fs.rmdirSync(path.join(cp, "/dist"))

		list()
	}).catch(err => console.log(err))
}
