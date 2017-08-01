// replace file
const fs = require("fs")
const path = require("path")
const colors = require("colors")
const cp = process.cwd()
const {
  getArgv,
  filterFile,
} = require("./utils.js")

exports.command = "replace"
exports.describe = "replace compressed images"
exports.handler = replace
exports.builder = () => {
  yargs
    .option({
      "i": {
        alias: "ignore",
        description: "files will be ignore",
      }
    })
    .help("h")
    .alias("h", "help")
}

function replace(args) {
  const images = getFolderImg(fs.readdirSync(cp))
  const ignores = getArgv(process.argv).ignore || []
  const ignoreFiles = ignores.map(o => {
    const {name, ext} = path.parse(o)
    return `${name}.compress${ext}`
  })

  filterFile(
    images,
    ignoreFiles,
    name => name.indexOf(".compress.") !== -1
  ).forEach(item => {
    const newName = item.replace(".compress", "")

    fs.unlinkSync(item)
    fs.renameSync(item, newName)
  })

  console.log("Complete Success!".green)
}
