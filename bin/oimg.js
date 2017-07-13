#!/usr/bin/env node

const yargs = require("yargs")
const list = require("./list.js")
const compress = require("./compress.js")

const argv = yargs
  .command(
    "l",
    "show all valid images",
    {
      ignore: {
        alias: "i",
        describe: "ignore some files"
      }
    }, list)
  .command(
    "c",
    "compress image",
    {
    }, compress)
  .example("$0 l -i abc.jpg", "list all image file & ignore some file")
  .help()
  .argv
