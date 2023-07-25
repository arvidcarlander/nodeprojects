const {exec} = require("child_process");
var express = require('express');
var router = express.Router();
var path = require('path')
var telldus = require("../utils/telldus.js")
var GeneralUtils   = require("../utils/general.js")
var data = require("../data/general.js")
var serverName = require('os').hostname()
//var Math = require('Math')
var debug = false



// TODO: 
//	Combine W1 and Telldus based on type in database. Check with db whether the device matches w1 or telldus (or oled?) name or id and call relevant function
//	Remove /telldus/
//	Switch order to temp/format instead of format/temp
//	Provide reasonable errors to client if Telldus, W1, or OLED does not respond
//	Teach clients to handle those errors
//	Add timestamp to standard format JSON
//	Handle case where telldus is passed non-existing device by device number

router.get('/oled/', function(req, res, next) {
	res.json(GeneralUtils.makeScreen())
});

// All Telldus items
router.get('/:fmt/temp/telldus/:item', function(req, res, next) {

	if (data.byName[req.params.item]) {
		deviceNumber = data.byName[req.params.item].device
	}else{
		// If item not recognized, hope that item is a number and pass it along
		deviceNumber =  req.params.item
	}

	telldus.getTelldus( deviceNumber,req,res)
				
});

router.get('/:fmt/temp/:item', function(req, res, next) {

	if (data.byName[req.params.item]) {
		deviceNumber = data.byName[req.params.item].device
		deviceName = data.byName[req.params.item].name
	}else{
		// If item not recognized, hope that item is a number and pass it along
		//deviceNumber =  req.params.item
		deviceNumber="fubar"
	}

	exec( 'cat /sys/bus/w1/devices/' + deviceNumber + '/w1_slave'
		,(error,stdout,stderr) => {
		if (error) {
			res.send("Error: "+error)
		}
		let t = w1temptostring(stdout)
		switch (req.params.fmt) {
			case "raw":
				res.send(stdout)
				break
			case "number":
				res.send(t)
				break
			case "json":
				res.json( { "name" : deviceName , "temp" : t})
				break
			default:
				res.send("Unknown format")
		
		}
	})
});
router.get('/:fmt/temp/vitavillan', function(req, res, next) {
	exec( "sudo -u pi ssh homebridge './cattojson'"
		,(error,stdout,stderr) => {
		if (error) {
			res.send("Error: "+error)
		}
		
		var json=JSON.parse(stdout)

		//let t = w1temptostring(stdout)
		switch (req.params.fmt) {
			case "raw":
				res.send(stdout)
				break
			case "number":
				res.send(t)
				break
			case "json":
				//res.json( { "name" : "Tegel", "temp" : t})
				res.json( json )
				break
			default:
				res.send("Unknown format")
		
		}
	})
});



// No longer needed
let Client, client ,allObjects

// Both cpu/ and cpu/nameofmyserver should be handled
router.get('/:fmt/temp/cpu', function(req,res,next) {
			getCpu(req, res, next)
})
router.get('/:fmt/temp/cpu/:server', function(req,res,next) {
	debug &&console.log("temp/cpu/server my servername is: "+ serverName + " and req.params.server is: " + req.params.server ) 
	switch( req.params.server.toLowerCase()) {

		// This server
		case "":
		case serverName.toLowerCase():
			getCpu(req, res, next)
			break;

		/*
		case "composepi":
			console.log("cpu: Passing request")
			Client = require('node-rest-client').Client
			client = new Client()
			client.get('http://ComposePI/api/json/temp/cpu/ComposePI',function(data,response) {
				console.log("ReturnData: ")
				console.dir(data)
				res.json(data)
			})
			break
			*/
		default:
			console.log("cpu request för another server - can not handle that")
			res.send("Can not handle cpu request för another server. Use /cpu instead ")
			break;

	}
})


/*
 	======= Internal functions ======= 
*/

function getCpu(req,res,next) {
	exec( '/opt/vc/bin/vcgencmd measure_temp'
		,(error,stdout,stderr) => {
		let t = stdout
		t = t.replace("temp=","")
		t = t.replace("\'C","")

		t=setNumberFormat(t)
		switch (req.params.fmt) {
			case "raw":
				res.send(stdout)
				break
			case "number":
				res.send(t)
				break
			case "json":
				res.json( { "name" : "cpu", "temp" : t})
				break
			default:
				res.send("Unknown format")
		
		}
	})
}
function w1temptostring(strinp) {
	
	//return ((strinp.split('=')[2] / 1000) + "")
	return (w1temp(strinp) + "")
}

function w1temp(strinp) {
	
	return (Math.round(strinp.split('=')[2] / 100) / 10)
}






module.exports = router;
