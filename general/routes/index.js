const {exec} = require("child_process");
var express = require('express');
var router = express.Router();
var path = require('path')
var telldus = require("../utils/telldus.js")
//var Math = require('Math')

// Internal functions
	function w1temptostring(strinp) {
		
		//return ((strinp.split('=')[2] / 1000) + "")
		return (w1temp(strinp) + "")
	}

	function w1temp(strinp) {
		
		return (Math.round(strinp.split('=')[2] / 100) / 10)
	}

	let get28 = function(req, res, next) {
		exec( 'cat /sys/bus/w1/devices/28-0301a279df82/w1_slave'
			,(error,stdout,stderr) => {
			let t = w1temptostring(stdout)
			switch (req.params.fmt) {
				case "raw":
					res.send(stdout)
					break
				case "json":
					res.json( { "name" : "Ducklingling", "temp" : t})
					break
				//case "number":
				default:
					res.send(t)
					break
			
			}
		})
	}

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });

	if (req.query.name){
		console.log(`Requesting ${req.query.name}`)
	}
	console.log("Returning the static index.htm")
	res.sendFile(path.join(__dirname, '../html', 'index.html'));
});

router.get('/tempbar', function(req, res, next) {
	if (req.query.name){
		console.log(`Chart test: Requesting ${req.query.name}`)
	}
	console.log("Returning the static charttest.htm")
	res.sendFile(path.join(__dirname, '../html', 'tempbar.html'));
});

router.get('/temp', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../html', 'temp.html'));
});

// TODO: The following two should merge and generalize
router.get('/api/:fmt/temp/telldus/:item', function(req, res, next) {
	function getTelldus(id) {
		const fubar = telldus.api.getSensorInfo(id)
			.then(sensorInfo => {
				//sensorInfo.JSON = JSON.parse(sensorInfo)
				//res.send(sensorInfo.JSON.id)
				//res.send(sensorInfo.data[0].value)
				console.dir(sensorInfo)

				if (  sensorInfo) {
					allJSON=sensorInfo.data[0]
					name=sensorInfo.name
					temp=sensorInfo.data[0].value
				} else {
					console.log("Error: Telldus returned nothing. Unknown device?")
					temp = 0
					name = "unknown"
					allJSON={}
				}
				if(sensorInfo.data[0].name != "temp") {
					console.log("Error: Telldus returned no temp. Humidity?")
					temp = 0
					name = "unknown"
					allJSON={}
				}
				switch (req.params.fmt) {
					case "raw":
						res.send(temp)
						break
					case "number":
						res.send(temp)
						break
					case "json":
						// Standard format
						res.json( { "name" : name, "temp" : temp})
						break
					case "rawjson":
						// Return the unadulterated JSON
						res.json(allJSON)
						//console.dir(allJSON)
						break
					default:
						res.send("Unknown format in API request")
				
				}
			})
	}
	//getTelldus( 1540845504)

	switch (req.params.item) {
		case "Outside": 		
			deviceNumber = 1540043414
			break
		case "duckling":
		case "ducklings":
			deviceNumber = 1540845504
			break
		case "Ducks": 		
			deviceNumber = 1540043189
			break
		default:
			// If item not recognized, hope that item is a number and pass it along
			deviceNumber =  req.params.item
	}

	getTelldus( deviceNumber)
				
});
router.get('/api/:fmt/temp/outdoors', function(req, res, next) {

	function getTelldus(id) {
		const fubar = telldus.api.getSensorInfo(id)
			.then(sensorInfo => {
				//sensorInfo.JSON = JSON.parse(sensorInfo)
				//res.send(sensorInfo.JSON.id)
				//res.send(sensorInfo.data[0].value)
				t=sensorInfo.data[0].value
				switch (req.params.fmt) {
					case "raw":
						res.send(t)
						break
					case "number":
						res.send(t)
						break
					case "json":
						res.json( { "name" : "Outdoors", "temp" : t})
						break
					default:
						res.send("Unknown format")
				
				}
			})
	}
	// Outdoors id
	getTelldus(1540043414)
});

router.get('/api/:fmt/temp/Telldus/:id', function(req, res, next) {

	function getTelldus(id) {
		const fubar = telldus.api.getSensorInfo(id)
			.then(sensorInfo => {
				tempValue=sensorInfo.data[0].value
				tempName=sensorInfo.name
				switch (req.params.fmt) {
					case "raw":
						res.send(tempValue)
						break
					case "number":
						res.send(tempValue)
						break
					case "json":
						res.json( { "name" : tempName, "temp" : tempValue})
						break
					default:
						res.send("Unknown format")
				
				}
			})
	}
	getTelldus(req.params.id)
});

router.get('/public/javascripts/client.js', function(req, res, next) {
	//res.sendFile('/home/pi/nodeprojects/general/public/javascripts/client.html')
	res.sendFile(path.join(__dirname, '../public/javascripts', 'client.html'));
});




/*  */
router.get('/api', function(req, res, next) {
		res.send( 'Try <a href="api/number/temp/w1/Duckling "> api/number/temp/w1/Duckling </a>')
});

router.get('/api/raw/temp/w1', function(req, res, next) {
	exec( 'cat /sys/bus/w1/devices/28*/w1_slave'
		,(error,stdout,stderr) => {
		let txt = stdout
		res.send(txt)
	})
});


router.get('/api/:fmt/temp/w1/ducklingling', function(req, res, next) {
	exec( 'cat /sys/bus/w1/devices/28-0301a279df82/w1_slave'
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
				res.json( { "name" : "Miniällingar", "temp" : t})
				break
			default:
				res.send("Unknown format")
		
		}
	})
});
router.get('/api/:fmt/temp/w1/vitavillan', function(req, res, next) {
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


// For top-level requests, simply try sending an html  file with the same name as the request. Works for http://xxx/ducklings if there is a page htmp/ducklings/html
router.get('/:requestName', function(req, res, next) {

	let requestName = req.params.requestName
	//res.sendFile(path.join(__dirname, '../html', 'outdoorsTemp.html'));
	res.sendFile(path.join(__dirname, '../html', requestName + '.html'));
});

router.get('/api/:fmt/temp/cpu', function(req, res, next) {
	exec( '/opt/vc/bin/vcgencmd measure_temp'
		,(error,stdout,stderr) => {
		let t = stdout
		t = t.replace("temp=","")
		t = t.replace("\'C","")

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
});

// Test of chart.js for Tfv
router.get('/charttest', function(req, res, next) {
	if (req.query.name){
		console.log(`Chart test: Requesting ${req.query.name}`)
	}
	console.log("Returning the static charttest.htm")
	res.sendFile(path.join(__dirname, '../html', 'charttest.html'));
});

module.exports = router;
