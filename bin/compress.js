const fs = require("fs")
const path = require("path")
const columnify = require("columnify")
const imagemin = require("imagemin")
const imageminJpeg = require("imagemin-jpegtran")
const imageminPng = require("imagemin-pngquant")
const imageminGif = require("imagemin-gifsicle")
const imageminSvg = require("imagemin-svgo")
const {list} = require("./list.js")
const {
  filterFile,
  getFolderImg
} = require("./utils.js")
const cp = process.cwd()

module.exports = {
  compress,
}

function compress(args) {
  const ignoreFiles = getCmdArgs(process.argv).ignore
  const files = fs.readdirSync(cp)
  const images = filterFile(
    getFolderImg(files),
    ignoreFiles,
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