const columnify = require("columnify")

module.exports = () => {
  const helps = [
    {
      cmd: "-h help [--ignore]",
      info: "show all the command of this tool."
    },
    {
      cmd: "-v version",
      info: "show this tool version."
    },
    {
      cmd: "-c compress [--ignore]",
      info: "compress images in curent folder."
    },
    {
      cmd: "-r replace [--ignore]",
      info: "use compress images replace origin images."
    }
  ]

  console.log(columnify(helps))
}