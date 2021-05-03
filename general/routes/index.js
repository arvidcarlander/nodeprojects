const {exec} = require("child_process");
var express = require('express');
var router = express.Router();
var path = require('path')
var telldus = require("../utils/telldus.js")
var data = require("../data/general.js")
var serverName = require('os').hostname()
//var Math = require('Math')
var debug = false
// Max age for Telldus info in seconds
var maxAgeTelldus = 10 * 60 


/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../html', 'index.html'));
});
/* GET home page. */
router.get('/temp', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../html', 'index.html'));
});
// For top-level requests, simply try sending an html  file with the same name as the request. Works for http://xxx/ducklings if there is a page htmp/ducklings/html
router.get('/:requestName', function(req, res, next) {

	let requestName = req.params.requestName
	res.sendFile(path.join(__dirname, '../html', requestName + '.html'));
});




module.exports = router;
