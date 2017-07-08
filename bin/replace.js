// replace file
const fs = require("fs")
const path = require("path")
const colors = require("colors")
const currentPath = process.cwd()
const {
  splitName,
  getCmdArgs,
  filterFiles,
} = require("./utils.js")

module.exports = (args) => {
  const ignoreFiles = getCmdArgs(args, "--ignore").map(o => {
    const nameSliece = splitName(o)
    return `${nameSliece.name}.compress.${nameSliece.ext}`
  })
  const files = fs.readdirSync(currentPath)
  const compressImages = filterFiles(files, ignoreFiles, name => {
    return name.indexOf(".compress.") !== -1
  })

  compressImages.forEach(item => {
    const newName = item.replace(".compress", "")

    fs.unlinkSync(path.join(currentPath, newName))
    fs.renameSync(path.join(currentPath, item), path.join(currentPath, newName))
  })

  console.log("Complete".green);
}