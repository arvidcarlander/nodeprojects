const {exec} = require("child_process");
var express = require('express');
var router = express.Router();
var path = require('path')
var telldus = require("../utils/telldus.js")
var oledupdater = require("../utils/oledupdater.js")
var data = require("../data/general.js")
var serverName = require('os').hostname()
//var Math = require('Math')
var debug = false
// Max age for Telldus info in seconds
var maxAgeTelldus = 10 * 60 
var oled 

// Temp fix: do not require the oled functions unless on a server that supports them. Otherwise app crashes on load.
// Should handle gracefully or at least look up self in database
console.log("Server name is: " + serverName)
if (serverName == "ComposePI") {
	oled = require("../utils/oled.js")

	router.get('/writeline/:text', function(req, res, next) {
			oled.writeLine(req.params.text)
			res.send("Writeline: "+req.params.text)
	})

	router.get('/writelines/:text', function(req, res, next) {
			oled.writeLines(req.params.text)
			res.send("Writelines: "+req.params.text)
	})

	router.get('/clear', function(req, res, next) {
			oledupdater.clear()
			res.send("Cleared oled display")
	})

	router.get('/start', function(req, res, next) {
			oledupdater.start()
			res.send("Started oled display autoupdate")
	})

	router.get('/stop', function(req, res, next) {
			oledupdater.stop()
			res.send("Stopped oled display autoupdate")
	})

} else {
	console.log("Sorry, this server cannot handle oleds")
	res.send("Sorry, this server cannot handle oleds")
}

module.exports = router;
