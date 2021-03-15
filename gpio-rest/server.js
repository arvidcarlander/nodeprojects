
var host = process.env.IP || 'localhost';
var port = process.env.PORT || 8080;

var gpioService = require("./gpioService.js");

var staticSite = __dirname + '/public';
var swaggerUI = __dirname + '/public/swag-ui';

var express = require('express');
var app = express();


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
// router.use(function(req, res, next) {
//     // do logging
//     console.log('Something is happening.');
//     next(); // make sure we go to the next routes and don't stop here
// });

router.route('/gpios')
    .get(function (req,res,next) {
        res.json(gpioService.gpioList());
    });

router.route('/gpios/:gpioID')
    .get(function (req,res,next) {
        var result=gpioService.gpioToggle(req.params.gpioID);
        var status = result.error ? 400:200;
        res.status(status).json(result);
    });
    

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.use('/', express.static(swaggerUI));
// router.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });   
// });


app.use('/', express.static(staticSite));
app.use('/api', router );

if (! process.env.C9_PID) {
    console.log('Running at http://'+ host +':' + port);
}
app.listen(port, function() { console.log('Listening')});
