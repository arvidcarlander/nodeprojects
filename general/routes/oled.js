const {exec} = require("child_process");
var express = require('express');
var router = express.Router();
var path = require('path')
var telldus = require("../utils/telldus.js")
var oled = require("../utils/oled.js")
var data = require("../data/general.js")
var serverName = require('os').hostname()
//var Math = require('Math')
var debug = false
// Max age for Telldus info in seconds
var maxAgeTelldus = 10 * 60 



router.get('/writeline/:text', function(req, res, next) {
		
		oled.writeLine(req.params.text)
})

module.exports = router;
