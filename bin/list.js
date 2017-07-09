const fs = require("fs") 
const path = require("path")
const columnify = require("columnify")
const {
  getArgv,
  filterFile,
  formatSize,
  getFolderImg,
} = require("./utils.js")
const cp = process.cwd()

module.exports = {
  list,
}

function list(args) {
  const ignoreFiles = getArgv(process.argv).ignore
  const foldFile = fs.readdirSync(cp)
  const images = filterFile(
    getFolderImg(foldFile),
    ignoreFiles,
    imgPath => imgPath.indexOf(".compress.") === -1
  )

  // images infomation
  const infos = images.map(item => {
    const {base, name, ext} = path.parse(item)
    const result = {
      name: base,
      path: item,
      size: fs.statSync(item).size
    }

    const compressFile = `${name}.compress${ext}`
    if(fs.existsSync(compressFile)) {
      const fileInfo = fs.statSync(path.join(cp, compressFile))
      result.compressSize = formatSize(fileInfo.size)
      result.ratio = fileInfo.size / result.size
    }

    return result
  })

  const logConfig = {
    columns: [
      "name",
      "size",
    ],
    showHeaders: false,
    columnSplitter: " ",
    config: {
      size: {
        dataTransform: size => formatSize(size)
      },
      ratio: {
        dataTransform: ratio => {
          if(ratio) {
            return ((1 - ratio) * 100).toFixed(0) + "%"
          }else {
            return ""
          }
        }
      }
    }
  }
  const hasCompressedFile = infos.some(o =>
    o.compressSize !== undefined
  )
  // add compressSize column if compressed image is exist
  if(hasCompressedFile) {
    logConfig.columns = logConfig.columns.concat([
      "compressSize",
      "ratio"
    ])
  }

  console.log(columnify(infos, logConfig))
}
