const {exec} = require("child_process");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });

    	if (req.query.name){
        	console.log(`Requesting ${req.query.name}`)
    	}
    	console.log("Returning the static index.htm")
    	//res.sendFile('html/index.html');
    	//res.sendFile(join(__dirname, 'html/index.html'));
    	res.sendFile('/home/pi/nodeprojects/general/html/index.html')
});

router.get('/public/javascripts/client.js', function(req, res, next) {
    	res.sendFile('/home/pi/nodeprojects/general/public/javascripts/client.html')
});




/*  */
router.get('/api', function(req, res, next) {
  		res.send('Try api/temp/w1 or api/temp/cpu ...')
});
router.get('/api/temp/w1', function(req, res, next) {
	exec( 'cat /sys/bus/w1/devices/28*/w1_slave'
		,(error,stdout,stderr) => {
  		res.send(stdout)
	})
});
/*  */
router.get('/api/temp/cpu', function(req, res, next) {
	exec( '/opt/vc/bin/vcgencmd measure_temp'
		,(error,stdout,stderr) => {
  		res.send(stdout)
	})
});
/*  */
router.get('/api/temp/w1/tegel', function(req, res, next) {
	exec( 'cat /sys/bus/w1/devices/28-0301a279df82/w1_slave'
		,(error,stdout,stderr) => {
  		res.send(stdout)
	})
});


module.exports = router;
