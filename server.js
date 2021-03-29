const static = require('node-static');
const http = require('http');
const path = require('path');

const file = new(static.Server)(path.join(__dirname, '/dist'));

http.createServer(function (req, res) {
	file.serve(req, res);
}).listen(8080);