#!/usr/bin/env node

const packageJson = require("../package.json")
const compress = require("./compress.js")
const list = require("./list.js")
const help = require("./help.js")

var run = (args) => {
  switch(args[0]) {
    case "-v":
    case "version":
      console.log(`v${packageJson.version}`)
      break
    case "-l":
    case "list":
      list(args)
      break
    case "-c":
    case "compress":
      compress(args)
      break
    case "-h":
    case "help":
      help()
      break
  }
}

run(process.argv.slice(2))
