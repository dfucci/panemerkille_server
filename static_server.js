var fileServer = require('node-static');
var file = new(fileServer.Server) ('./static');
require('http').createServer(function(req, res) {
	req.addListener('end', function() {
		file.serve(req, res)
	});
}).listen(7778);