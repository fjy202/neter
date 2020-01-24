'use strict';

var args = process.argv;
if (args.length < 4 || args.includes("-h") || args.includes("--help")) {
	console.log("usage: neter-client ip port");
	process.exit();
}
var { Socket, isIP } = require("net");
if (!isIP(args[2])) {
	console.log("error: ip invalid");
	process.exit();
}
var sock = new Socket();
sock.connect(Number(args[3]), args[2]);
sock.on("data", (data) => {
	console.log(data.toString("utf8"));
});
process.stdin.on("data", (data) => {
	var v = data.toString("utf8");
	sock.write(v);
})
process.stdin.on("close", (had_error) => {
	sock.end();
	process.exit();
});
sock.on("end", () => {
	process.exit();
})