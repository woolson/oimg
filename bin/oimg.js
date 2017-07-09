#!/usr/bin/env node

const yargs = require("yargs")
const colors = require("colors")
const {list} = require("./list.js")
const {compress} = require("./compress.js")

const argv = yargs
  .command(
    "list",
    "show all valid images",
    {
      ignore: {
        alias: "i",
        describe: "ignore some files"
      }
    }, list)
  .command(
    "compress",
    "compress image",
    {}, compress)
  .help()
  .argv
