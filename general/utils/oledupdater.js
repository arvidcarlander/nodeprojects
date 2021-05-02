var oled = require('./oled.js')
var general = require('./general.js')

let debug = false
let updateTimer 
let currentDateTime
let interval = 500
let lastMinutes = 0


function update () {
	let screenArray = general.makeScreen()
	
	if( minutes != lastMinutes) {
		oled.writeLines(screenArray)
		lastMinutes = minutes
	}
}

function start () {
	//oled.writeLines('starting....')
	lastMinutes = 0 // For immediate update - no wait for interval
	update()
	updateTimer = setInterval(update,interval)
}
function stop () {
	if (updateTimer) {
		clearInterval(updateTimer)
		updateTimer.unref()
		oled.writeLines('stopped....')
	} else {
		oled.writeLines('already....')
	}
}

module.exports.update=update		// For testing only
module.exports.start=start
module.exports.stop=stop

start()

