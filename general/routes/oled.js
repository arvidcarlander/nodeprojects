const {exec} = require("child_process");
var express = require('express');
var router = express.Router();
var path = require('path')
var telldus = require("../utils/telldus.js")
var oled = require("../utils/oled.js")
var oledupdater = require("../utils/oledupdater.js")
var data = require("../data/general.js")
var serverName = require('os').hostname()
//var Math = require('Math')
var debug = false
// Max age for Telldus info in seconds
var maxAgeTelldus = 10 * 60 



router.get('/writeline/:text', function(req, res, next) {
		
		oled.writeLine(req.params.text)
})

router.get('/start', function(req, res, next) {
		
		oledupdater.start()
})

router.get('/stop', function(req, res, next) {
		
		oledupdater.stop()
})

module.exports = router;
