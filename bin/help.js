const columnify = require("columnify")

module.exports = () => {
  const helps = [
    {
      cmd: "-h help",
      info: "show all the command of this tool"
    },
    {
      cmd: "-v version",
      info: "show this tool version"
    },
    {
      cmd: "-c compress",
      info: "compress images in curent folder"
    }
  ]

  console.log(columnify(helps))
}