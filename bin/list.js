const fs = require("fs") 
const path = require("path")
const columnify = require("columnify")
const {
  getCmdArgs,
  filterFiles
} = require("./utils.js")
const currentPath = process.cwd()

module.exports = (arg) => {
  // 需要忽略的文件
  const ignoreFiles = getCmdArgs(arg, "--ignore")
  const files = fs.readdirSync(currentPath)
  const images = filterFiles(files, ignoreFiles)

  const infos = images.map(item => {
    const fileInfo = fs.statSync(path.join(currentPath, item))
    const size = (fileInfo.size / 1000).toFixed("2")

    return {
      name: item,
      size: `${size}KB`
    }
  })

  const logConfig = {
    columns: [
      "name",
      "size"
     ],
     showHeaders: false,
     columnSplitter: " | "
  }


  console.log(columnify(infos, logConfig))
}