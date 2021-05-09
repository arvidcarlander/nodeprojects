
function getTime () {
	currentDateTime = new Date()

	// Make sure these are local
	let hours, minutes, seconds, allDays, day, date, month
	hours =  currentDateTime.getHours()
	hours =  ('0' + hours).slice(-2)
	minutes =  currentDateTime.getMinutes()
	minutes =  ('0' + minutes).slice(-2)
	seconds =  currentDateTime.getSeconds()
	seconds =  ('0' + seconds).slice(-2)

	//allDays=["Mån","Tis","Ons","Tor","Fre","Lör","Sön"]
	allDays=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
	day =  allDays[currentDateTime.getDay()]

	date = currentDateTime.getDate()
	month = currentDateTime.getMonth() + 1
	return({
		day: day,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
		allDays: allDays,
		day: day,
		date: date,
		month: month
	})


}

function makeScreen () {
	//console.log("In makeScreen")
	let time = getTime()
	currentStringArray = []
	currentStringArray.push( "   " + time.hours + ':' + time.minutes)
	currentStringArray.push( " " + time.day + " " + time.date + "/" + time.month)

	currentStringArray.push( "a:Bx  W:WW")
	currentStringArray.push( "x:xC  y:yy")
	//currentString = currentString + ':' + time.seconds
	return(currentStringArray)
}
module.exports.getTime = getTime
module.exports.makeScreen = makeScreen
