//examine the request and run the corresponding fuction.
function route(handle, pathname, queryData, funcion){
	console.log("Routing "+pathname);
	if(typeof handle[pathname] === 'function'){
		return handle[pathname](queryData, funcion);
	}else{
		return "{error : 404, message : Page not found!!!}";
	}
}

exports.route = route;