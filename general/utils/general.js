
function getTime () {
	currentDateTime = new Date()

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
		day: day
	})


}

function makeScreen () {
	let time = getTime()
	//currentString = hours + ':' + minutes
	currentStringArray = []
	currentStringArray.push( "   " + hours + ':' + minutes)
	currentStringArray.push( " " + day + " " + date + "/" + month)
	currentStringArray.push( "x:xx  y:yy")
	currentStringArray.push( "x:xx  y:yy")
	//currentString = currentString + ':' + seconds
	return(currentStringArray)
}
module.exports.getTime = getTime
module.exports.makeScreen = makeScreen
