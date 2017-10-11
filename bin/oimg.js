#!/usr/bin/env node

const yargs = require("yargs")

const argv = yargs
	.command(require("./list.js"))
	.command(require("./compress.js"))
	.command(require("./replace.js"))
	.command(require("./remove.js"))
	.command(require("./version.js"))
	.help("h")
	.argv
