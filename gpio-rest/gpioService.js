var async = require('async');


var gpio;
if (process.env.PORT) {	
	gpio=require("./pi-gpio-stub");	// not running on a PI
  
}
else { 
	gpio=require("pi-gpio");
}

// Physical pins as listed at: https://www.npmjs.com/package/pi-gpio
// pin numbers will start at 1
var hwPins=[undefined,7,11,12,13,15,16,18,22]; 


function makeGpio(pin,i){
	return ({ 'id':i,'gpioPin':pin });
}

var gpios=hwPins.map(makeGpio);


function gpioToggle(gpioID){
    if (gpios[ gpioID ] && gpios[gpioID].gpioPin ) {
      var hwPin = gpios[gpioID].gpioPin;
  		try {
  			async.series([
  				function ( cb ){
  					gpio.open(hwPin, "output");
  					cb(null);
  				},
  				function ( cb ){
  					gpio.write(hwPin, 1);
  					cb(null);
  				},
  				function ( cb ){
  					setTimeout(cb, 500);  //millisecs
  					cb();
  				},
  				function ( cb ){
  					gpio.write(hwPin, 0);
  					cb();
  				},
  				function ( cb ){
  					gpio.close(hwPin);
  					cb();
  				},
  				function ( cb ){
  					gpio.close(hwPin);
  					cb();
  				}],
  				function (err){
  					if (err){
  						throw err
  					}
  				}
  			);
  			return (gpios[gpioID]);
  		}
  		catch (e) {
  			return ({'error': "Operation on hwpin " + hwPin + " failed: "} );
  		}
    }
    else {
      return ({ 'error' : "Invalid ID supplied"});
    }
};


function gpioList(){
    return({'gpios': gpios});
};

exports.gpioList = gpioList
exports.gpioToggle = gpioToggle