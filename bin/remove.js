/*
* @Author: woolson
* @Date:   2017-07-27 21:07:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2017-07-27 21:07:60
*/

// remove file
const yargs = require("yargs")
const fs = require("fs")
const path = require("path")
const cp = process.cwd()
const {
  getArgv,
  filterFile,
  getFolderImg,
} = require("./utils.js")

exports.command  = "remove"
exports.describe = "remove the generated file after compress"
exports.handler  = remove
exports.builder  = () => {
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
}
