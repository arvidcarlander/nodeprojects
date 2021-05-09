var oled = require('./oled.js')
var general = require('./general.js')

let debug = false
let updateTimer 
let currentDateTime
let interval = 30 * 1000


function update () {
	let screenArray = general.makeScreen()
	oled.writeLines(screenArray)
}

function start () {
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
function clear () {
	stop()
	oled.clear()
}

module.exports.update=update		// For testing only
module.exports.start=start
module.exports.stop=stop
module.exports.clear=clear

start()

