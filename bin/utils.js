// get cmd args
module.exports = {
  getCmdArgs: (args, cmd) => {
    var start = false
    var result = []
    
    args.forEach(item => {
      if(start) result.push(item)
      if(item.indexOf("-") !== -1) start = false
      if(item === cmd) start = true
    })

    return result
  },
  filterFiles: (files, ignoreFiles, cb) => {
    const exts = [
      "jpg",
      "jpeg",
      "png",
      "svg",
      "gif"
    ]
  
    return files.filter(o => {
      const ext = o.split(".").pop()

      const isImg = exts.indexOf(ext) !== -1
      const isNeed = cb ? cb(o) : true
      const isIgnore = ignoreFiles ?
        ignoreFiles.indexOf(o) !== -1
        :
        false

      return isImg && !isIgnore && isNeed
    })
  },
  splitName: (fileName) => {
    const namePiece = fileName.split(".")

    return {
      ext: namePiece.pop(),
      name: namePiece.join(".")
    }
  },
  formatSize(size, digit = 2) {
    const unit = ["B", "KB", "MB", "GB", "TB"]
    let unitIndex = 0

    while(size > 1000) {
      size = size / 1000
      unitIndex++
    }

    return `${size.toFixed(digit)}${unit[unitIndex]}`
  }
}