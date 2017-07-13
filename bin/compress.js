const fs = require("fs")
const path = require("path")
const columnify = require("columnify")
const imagemin = require("imagemin")
const imageminJpeg = require("imagemin-jpegtran")
const imageminPng = require("imagemin-pngquant")
const imageminGif = require("imagemin-gifsicle")
const imageminSvg = require("imagemin-svgo")
const list = require("./list.js")
const {
  getArgv,
  filterFile,
  getFolderImg
} = require("./utils.js")
const cp = process.cwd()

exports.compress = compress
exports.handler  = compress
exports.command  = "compress"
exports.describe = "compress select image"
exports.builder  = () => {
  yargs
    .option("i", {
      alias: "ignore",
      description: "files will be ignore",
    })
    .help("h")
    .alias("h", "help")
}

function compress() {
  const args = getArgv(process.argv)
  const cPath = args.path ? path.resolve(args.path[0]) : cp
  const images = filterFile(
    getFolderImg(cPath),
    args.ignore || [],
    imgPath => imgPath.indexOf(".compress.") === -1
  )

  imagemin(images, "dist", {
    plugins: [
      imageminJpeg(),
      imageminPng({quality: "65-80"}),
      imageminGif(),
      imageminSvg(),
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

    list([])
  })
}
