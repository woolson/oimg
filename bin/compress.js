const fs = require("fs")
const path = require("path")
const columnify = require("columnify")
const imagemin = require("imagemin")
const imageminJpeg = require("imagemin-jpegtran")
const imageminPng = require("imagemin-pngquant")
const imageminGif = require("imagemin-gifsicle")
const imageminSvg = require("imagemin-svgo")
const {
  splitName,
  getCmdArgs,
  filterFiles
} = require("./utils.js")
const currentPath = process.cwd()

module.exports = (args) => {
  const ignoreFiles = getCmdArgs(args, "--ignore")
  const files = fs.readdirSync(currentPath)
  const images = filterFiles(files, ignoreFiles)

  const infos = images.map(item => {
    const nameExt = splitName(item)
    const fileInfo = fs.statSync(path.join(currentPath, item))
    const size = (fileInfo.size / 1000).toFixed("2")

    return {
      name: item,
      outputName: `${nameExt.name}.compress.${nameExt.ext}`,
      size: `${size}KB`
    }
  })

  const imageBuffer = images.map(item => {
    return path.join(currentPath, item)
  })

  imagemin(imageBuffer, ".", {
    plugins: [
      imageminJpeg(),
      imageminPng({quality: '65-80'}),
      imageminGif(),
      imageminSvg(),
    ]
  }).then(files => {
    const result = []

    files.forEach((item, index) => {
      const fileInfo = splitName(item.path)
      const filename = `${fileInfo.name}.compress.${fileInfo.ext}`
      fs.writeFileSync(path.resolve(filename), item.data)
      const outputSize = fs.statSync(path.join(currentPath, filename), item).size

      infos[index].outputSize = `${(outputSize / 1000).toFixed(2)}KB`
    })

    console.log(columnify(infos, {columns: ["name", "size", "outputName", "outputSize"]}))
  })
}