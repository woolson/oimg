const yargs = require("yargs")
const fs = require("fs")
const colors = require("colors")
const path = require("path")
const columnify = require("columnify")
const {
  getArgv,
  filterFile,
  formatSize,
  getFolderImg,
} = require("./utils.js")
const cp = process.cwd()

exports.list = list
exports.handler = list
exports.command = "list"
exports.describe = "show all valid images"
exports.builder = () => {
  yargs
  .option({
    "i": {
      alias: "ignore",
      description: "files will be ignore",
    },
    "f": {
      alias: "folder",
      description: "that path image will be show",
    },
  })
  .help("h")
  .alias("h", "help")
}

function list() {
  const args = getArgv(process.argv)
  const cPath = args.path ? path.resolve(args.path[0]) : cp

  if(!fs.existsSync(cPath)) {
    console.log("Error: ".red + "%s".underline + " does not exist.", cPath)
    process.exit(1)
  }

  const images = filterFile(
    getFolderImg(cPath),
    args.ignore || [],
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
      const fileInfo = fs.statSync(path.join(cPath, compressFile))
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
          if(ratio) return ((1 - ratio) * 100).toFixed(0) + "%"
          else return ""
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

  if(infos.length === 0) {
    console.log("Error: ".red + "%s".underline + " has No image file.", cPath)
  }else {
    console.log(columnify(infos, logConfig))
  }
}
