const yargs = require("yargs")
const colors = require("colors")
const fs = require("fs")
const path = require("path")
const cp = process.cwd()
const {
  getArgv,
  getFolderImg,
} = require("./utils.js")

exports.command = "remove"
exports.describe = "remove the generated file after compress"
exports.handler = remove
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

function remove() {
  const ignores = getArgv(process.argv).ignore || []
  const valideImg = getFolderImg(cp).filter(o => {
    const {name} = path.parse(path.resolve(o))
    return name.indexOf("compress") !== -1
  })

  valideImg.forEach(o => fs.unlinkSync(o))
  console.log("remove complete!".green)
}
