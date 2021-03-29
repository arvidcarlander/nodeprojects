const {exec} = require("child_process");
var express = require('express');
var router = express.Router();
var path = require('path')
//var Math = require('Math')

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });

    	if (req.query.name){
        	console.log(`Requesting ${req.query.name}`)
    	}
    	console.log("Returning the static index.htm")
    	//res.sendFile('html/index.html');
    	//res.sendFile(join(__dirname, 'html/index.html'));
	res.sendFile(path.join(__dirname, '../html', 'index.html'));
});

// Test of chart.js for Tfv
router.get('/charttest', function(req, res, next) {
  //res.render('index', { title: 'chart.js' });

    	if (req.query.name){
        	console.log(`Chart test: Requesting ${req.query.name}`)
    	}
    	console.log("Returning the static charttest.htm")
	res.sendFile(path.join(__dirname, '../html', 'charttest.html'));
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

function w1temptostring(strinp) {
	
	//return ((strinp.split('=')[2] / 1000) + "")
	return (w1temp(strinp) + "")
}

function w1temp(strinp) {
	
	return (Math.round(strinp.split('=')[2] / 100) / 10)
}

router.get('/api/:fmt/temp/w1/tegel', function(req, res, next) {
	exec( 'cat /sys/bus/w1/devices/28-0301a279df82/w1_slave'
		,(error,stdout,stderr) => {
		let t = w1temptostring(stdout)
		switch (req.params.fmt) {
			case "raw":
				res.send(stdout)
				break
			case "number":
				res.send(t)
				break
			case "json":
				res.json( { "name" : "Tegel", "temp" : t})
				break
			default:
				res.send("Unknown format")
		
		}
	})
});

let getDuck = function(req, res, next) {
	exec( 'cat /sys/bus/w1/devices/28-0301a279df82/w1_slave'
		,(error,stdout,stderr) => {
		let t = w1temptostring(stdout)
		switch (req.params.fmt) {
			case "raw":
				res.send(stdout)
				break
			case "json":
				res.json( { "name" : "Duckling", "temp" : t})
				break
			//case "number":
			default:
				res.send(t)
				break
		
		}
	})
}
router.get('/api/:fmt/temp/w1/Duckling', getDuck);

router.get('/Duckling', function(req, res, next) {

	res.sendFile(path.join(__dirname, '../html', 'ducklingTemp.html'));
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
/* 
router.get('/api/temp/raw/cpu', function(req, res, next) {
	exec( '/opt/vc/bin/vcgencmd measure_temp'
		,(error,stdout,stderr) => {
  		res.send(stdout)
	})
});
*/

module.exports = router;
