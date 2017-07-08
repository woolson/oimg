// compress command file

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
  splitName,
  getCmdArgs,
  filterFiles
} = require("./utils.js")
const currentPath = process.cwd()

module.exports = (args) => {
  const ignoreFiles = getCmdArgs(args, "--ignore")
  const files = fs.readdirSync(currentPath)
  const images = filterFiles(files, ignoreFiles, name => {
    return name.indexOf(".compress.") === -1
  })

  const imagesPaths = images.map(item => {
    return path.join(currentPath, item)
  })

  imagemin(imagesPaths, "imagemin-dist", {
    plugins: [
      imageminJpeg(),
      imageminPng({quality: "65-80"}),
      imageminGif(),
      imageminSvg(),
    ]
  }).then(files => {
    // move file to current folder
    files.forEach(item => {
      const filePath = path.join(currentPath, item.path)
      const pathSliece = splitName(filePath)
      const newName = pathSliece.name.replace("/imagemin-dist", "")
      const newPath = `${newName}.compress.${pathSliece.ext}`
      fs.renameSync(filePath, newPath)
    })

    // delete generated folder
    fs.rmdirSync(path.join(currentPath, "/imagemin-dist"))

    list([])
  })
}