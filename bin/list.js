const fs = require("fs") 
const path = require("path")
const columnify = require("columnify")
const {
  splitName,
  getCmdArgs,
  filterFiles,
  formatSize,
} = require("./utils.js")
const currentPath = process.cwd()

module.exports = (arg) => {
  // 需要忽略的文件
  const ignoreFiles = getCmdArgs(arg, "--ignore")
  const files = fs.readdirSync(currentPath)
  const images = filterFiles(files, ignoreFiles)

  const infos = images.map(item => {
    const fileInfo = fs.statSync(path.join(currentPath, item))
    const namePiece = splitName(item)
    const result = {
      name: item,
      size: formatSize(fileInfo.size)
    }

    const compressName = `${namePiece.name}.compress.${namePiece.ext}`
    if(fs.existsSync(compressName)) {
      const compressFile = fs.statSync(path.join(currentPath, compressName))
      result.compressSize = formatSize(compressFile.size)
    }else {
      result.compressSize = ""
    }

    return result
  })

  const logConfig = {
    columns: [
      "name",
      "size",
      "compressSize",
     ],
     showHeaders: false,
     columnSplitter: " | "
  }

  console.log(columnify(infos, logConfig))
}