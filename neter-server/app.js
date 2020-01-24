'use strict';

var args = process.argv;
if (args.length < 5 || args.includes("-h") || args.includes("--help")) {
	console.log("usage: neter-server ip port handler");
	process.exit();
}
var { createServer, isIP } = require("net");
var { exec } = require("child_process");
if (!isIP(args[2])) {
	console.log("error: ip invalid");
	process.exit();
}
var ser = createServer((sock) => {
	var proc = exec(args[4] + " " + sock.address());
	proc.stdout.on("data", (data) => { sock.write(new Buffer(data)) })
	sock.on("data", (data) => {
		proc.stdin.write(data);
	})
}).listen(parseInt(args[3]), args[2])