const yargs = require("yargs")
const path = require("path")

exports.command = "version"
exports.builder = () => {
	yargs
		.alias("v", "version")
		.help("h")
}
exports.handler = () => {
	var package = require(path.join(__dirname, "../package"))
	console.log(`v${package.version}`)
}
