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
if (servername == "composepi") {
	oled = require("../utils/oled.js")

	router.get('/writeline/:text', function(req, res, next) {
			oled.writeLine(req.params.text)
	})

	router.get('/writelines/:text', function(req, res, next) {
			oled.writeLines(req.params.text)
	})

	router.get('/clear', function(req, res, next) {
			oledupdater.clear()
	})

	router.get('/start', function(req, res, next) {
			oledupdater.start()
	})

	router.get('/stop', function(req, res, next) {
			oledupdater.stop()
	})

}

module.exports = router;
