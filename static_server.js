var fileServer = require('node-static');
var file = new(fileServer.Server) ('./static');
var port = process.env.PORT || 7778;
require('http').createServer(function(req, res) {
	req.addListener('end', function() {
		file.serve(req, res)
	});
}).listen(port);
