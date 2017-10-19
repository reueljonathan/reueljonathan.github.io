var http = require('http');
var fs = require('fs');
var host = "127.0.0.1";
var port = 1337;
var filePath = "index.html";
console.log("starting");

var server = http.createServer(function(request, response){
	console.log("received request " + request.url);

	if(request.url === "/"){
		filePath = "./index.html";
	} else {
		filePath = "." + request.url;
	}


	fs.readFile(filePath, function(error, data){
		if(error){
			response.writeHead(404, {'Content-type':'text/plain'})
			response.end("Not found");
		} else {
			if(request.url.indexOf("css") > -1)
				response.writeHead(200, {'Content-type':'text/css'});
			else
				response.writeHead(200, {'Content-type':'text/html'});
			response.end(data);
		}
	})
});


server.listen(port, host, function(){
	console.log("Listening " + host + ":" + port);
})