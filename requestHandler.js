//conection params
var databaseURL = "mongodb://localhost/medikit";
var collections = ["users","medicines"];
var db = require("mongojs").connect(databaseURL, collections);

//examine if the username exists in the database.
function principal(queryData, funcion){
	funcion(false, [{funciones: '4'},[{funcion: 'validate', parameters: [{parm1: 'username'}, {param2: 'password'}]},{funcion:'obt_medicines', parameters:[]},{funcion:'insert_medicine',parameters:[{param1:'medicine'}]},{funcion:'disable_medicine',parameters:[{param1:'medicine'}]}]])
}
function login(queryData, funcion){
	console.log("Realiza funcion login...");
	var user = queryData.username;
	var pass = queryData.password;
	db.users.find({ username: user, password: pass }, function(err, data){
		funcion(err,data);
	});
}
//obteins all the medicines from the database
function obt_medicines(queryData, funcion){
	console.log("Realiza funcion obtener medicinas...");
	db.medicines.find({ enable: '0' },{ medicine: '0', _id: 0 },function(err, data){
		var m = [];
		for(var i in data){
			m.push(data[i].medicine);
		}
		funcion(err,m)
	});
}
//insert a new medicine in the database
function insert_medicine(queryData, funcion){
	console.log("Realiza funcion insertar medicina...");
	var res = [{estado: 'true'}];
	var medi = queryData.medicine;
	db.medicines.find({ medicine: medi},function(err, data){
		if(Object.keys(data).length > 0){
			data = data[0];
			if(data.enable == '1'){
				db.medicines.update({medicine: medi},{medicine: medi, enable: '0'});
			}else{
				res = [];
			}
		}else{
			db.medicines.insert({medicine: medi, enable: '0'});
		}
		funcion(err,res);
	});
}
//put the selected medicine disable
function disable_medicine(queryData, funcion){
	console.log("Realiza funcion deshabilitar medicina...");
	var medi = queryData.medicine;
	db.medicines.update({ medicine: medi },{ medicine: medi, enable: '1' });
	funcion(false, [{estado: 'true'}]);
}

exports.principal = principal;
exports.obt_medicines = obt_medicines;
exports.insert_medicine = insert_medicine;
exports.disable_medicine = disable_medicine;
exports.login = login;