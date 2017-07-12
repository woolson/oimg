const path = require("path")
const cp = process.cwd()
module.exports = {
  getArgv,
  filterFile,
  formatSize,
  getFolderImg,
  isImage,
}

function getArgv(args) {
  args = args.slice(3)

  const result = {}
  const alias = {
    "i": "ignore",
  }
  let key = ""

  args.forEach(item => {
    if(
      item.indexOf("-") !== -1 ||
      item.indexOf("--") !== -1
     ) {
      key = item.replace(/-/g, "")
      key = alias[key] || key
      result[key] = []
    }else {
      result[key].push(item)
    }
  })

  return result
}

function filterFile(files, ignoreFiles, cb) {
  ignoreFiles = ignoreFiles.map(o => path.resolve(o))

  return files.filter(o => {
    const isImg = isImage(o)
    const isNeed = cb ? cb(o) : true
    const isIgnore = ignoreFiles ?
      ignoreFiles.indexOf(o) !== -1
      :
      false

    return isImg && !isIgnore && isNeed
  })
}

function formatSize(size, digit = 2) {
  const unit = ["B", "KB", "MB", "GB", "TB"]
  let unitIndex = 0

  while(size > 1000) {
    size = size / 1000
    unitIndex++
  }

  return `${size.toFixed(digit)}${unit[unitIndex]}`
}

function getFolderImg(items) {
  items = items.filter(o => isImage(o))
  return items.map(o => path.join(cp, o))
}

function isImage(imgPath) {
  const exts = [".jpg", ".jpeg", ".png", ".svg", ".gif"]
  const imageExt = path.extname(imgPath)
  return exts.indexOf(imageExt) !== -1
}