const fs = require("fs")
const path = require("path")
const imagemin = require("imagemin")
const imageminJpeg = require("imagemin-jpegtran")
const imageminPng = require("imagemin-pngquant")
const imageminGif = require("imagemin-gifsicle")
const imageminSvg = require("imagemin-svgo")
const {
  getCmdArgs,
  filterFiles
} = require("./utils.js")
const currentPath = process.cwd()

module.exports = (args) => {
  const ignoreFiles = getCmdArgs(args, "--ignore")
  const files = fs.readdirSync(currentPath)
  const images = filterFiles(files, ignoreFiles)

  // const infos = images.map(item => {
  //   const fileInfo = fs.statSync(path.join(currentPath, item))
  //   const size = (fileInfo.size / 1000).toFixed("2")

  //   return {
  //     name: item,
  //     size: `${size}KB`
  //   }
  // })

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

    console.log(files)

    files.forEach(item => {
      const oldName = item.path.split(".")
      const ext = oldName.pop()
      const filename = `${oldName.join("")}.compress.${ext}`
      fs.writeFileSync(path.resolve(filename), item.data)
    })
  })
}