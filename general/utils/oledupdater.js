var oled = require('./oled.js')

let debug = false
let updateTimer 
let currentDateTime
let interval = 500
let lastMinutes = 0

function update () {
	currentDateTime = new Date()

	hours =  currentDateTime.getHours()
	hours =  ('0' + hours).slice(-2)

	minutes =  currentDateTime.getMinutes()
	minutes =  ('0' + minutes).slice(-2)

	seconds =  currentDateTime.getSeconds()
	seconds =  ('0' + seconds).slice(-2)

	allDays=["Mån","Tis","Ons","Tor","Fre","Lör","Sön"]
	day =  allDays[currentDateTime.getDay()-1]

	//currentString = hours + ':' + minutes
	currentStringArray = ["   " + hours + ':' + minutes, day]
	//currentString = currentString + ':' + seconds

	if( minutes != lastMinutes) {
		//oled.writeLines('   ' + currentString)
		oled.writeLines(currentStringArray)
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

