const {exec} = require("child_process");
var express = require('express');
var router = express.Router();
var path = require('path')

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

router.get('/public/javascripts/client.js', function(req, res, next) {
    	//res.sendFile('/home/pi/nodeprojects/general/public/javascripts/client.html')
	res.sendFile(path.join(__dirname, '../public/javascripts', 'client.html'));
});




/*  */
router.get('/api', function(req, res, next) {
  		res.send( 'Try <a href="http://raspberrypi:3000/api/temp/w1 "> api/simple/temp/w1 </a>')
});

router.get('/api/temp/raw/w1', function(req, res, next) {
	exec( 'cat /sys/bus/w1/devices/28*/w1_slave'
		,(error,stdout,stderr) => {
		let txt = stdout
  		res.send(txt)
	})
});

function w1temptostring(strinp) {
	//let txt = strinp.split('=')[2] 
	
	return ((strinp.split('=')[2] / 1000) + "")
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
