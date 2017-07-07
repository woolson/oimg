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
  filterFiles: (files, ignoreFiles) => {
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
      const isIgnore = ignoreFiles.indexOf(o) !== -1

      return isImg && !isIgnore
    })
  }
}