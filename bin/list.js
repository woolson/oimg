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
  // filtered iamges witch needs ignored
  const ignoreFiles = getCmdArgs(arg, "--ignore")
  const files = fs.readdirSync(currentPath)
  const images = filterFiles(files, ignoreFiles)

  // images infomation
  const infos = images.map(item => {
    const fileInfo = fs.statSync(path.join(currentPath, item))
    const namePiece = splitName(item)
    const compressName = `${namePiece.name}.compress.${namePiece.ext}`
    const result = {
      name: item,
      size: formatSize(fileInfo.size)
    }

    if(fs.existsSync(compressName)) {
      const compressFile = fs.statSync(path.join(currentPath, compressName))
      result.compressSize = formatSize(compressFile.size)
    }

    return result
  })

  const logConfig = {
    columns: [
      "name",
      "size",
     ],
     showHeaders: false,
     columnSplitter: " | "
  }
  const hasCompressedFile = infos.some(o => o.compressSize !== "")
  // add compressSize column if compressed image is exist
  if(hasCompressedFile) logConfig.columns.push("compressSize")

  console.log(columnify(infos, logConfig))
}