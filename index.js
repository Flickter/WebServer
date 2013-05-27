var server = require("./server");
var requestHandler = require("./requestHandler");

var handle = {};
//make the handle and keep the fuction if the url request is any of the following.
handle["/"] = requestHandler.principal;
handle["/validate"] = requestHandler.login;
handle["/obt_medicines"] = requestHandler.obt_medicines;
handle["/insert_medicine"] = requestHandler.insert_medicine;
handle["/disable_medicine"] = requestHandler.disable_medicine;
server.startServer(handle);