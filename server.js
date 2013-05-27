var http = require("http");
var url = require("url");
var router = require("./router");

//recieve the fuction and send a response depending of the fuction.
function startServer(handle){
	console.log("Server started");
	http.createServer(
		function(request, response){
			var pathname = url.parse(request.url).pathname;
			var queryData = url.parse(request.url,true).query;
			router.route(handle, pathname, queryData, function(err, data){
				response.writeHead(200,{"Content-Type" : "text/html"});
				if (err || !data || Object.keys(data).length < 1)
					response.end('_log(\''+'false'+'\')');
				else {
					console.log(data);
					response.end('_log(\''+JSON.stringify(data)+'\')');
				}
			});
		}
		).listen(8888);
}
exports.startServer = startServer;