var debug = false

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
	let telldus = getTelldus()
	currentStringArray = []
	currentStringArray.push( "   " + time.hours + ':' + time.minutes)
	currentStringArray.push( " " + time.day + " " + time.date + "/" + time.month)

	currentStringArray.push( "  O:" + telldus.out + " H:" + telldus.hens )

	currentStringArray.push( "x:xx  y:yy")
	//currentString = currentString + ':' + time.seconds
	return(currentStringArray)
}

// Take a string and format it to two digits before and one after the .

function setNumberFormat(nr) {
        debug &&console.log("setNumberFormat, called with number: " + nr)
        if (  /\-/.test(nr)) {
                debug &&console.log("Dash")
                return("--.-")
        }
        if ( ! /\./.test(nr)) {
                debug &&console.log("has no .")
                nr = nr + ".0"
                debug &&console.log("Added .0: " + nr)
        }
        //nr = "  0" + nr + "000"
	// Unsure if space works as the two digit prefix - perhaps eaten by html?
        nr = "   " + nr + "000"
        debug &&console.log("Prefixed spaces and appended 000: xxx" + nr + "xxx")
        debug &&console.log("Splitting on .")
        let a = nr.split(".")
        debug &&console.log("a0 is now: xxx" + a[0] + "xxx")
        debug &&console.log("a1 is now: xxx" + a[1] + "xxx")
        let left  = a[0].substring(a[0].length - 2,12)
        let right = a[1].substring(0,1)
        debug &&console.log( "left  is now: xxx" + left  + "xxx" )
        debug &&console.log("right  is now: xxx" + right + "xxx" )
        return(left + "." + right)
}

module.exports.getTime = getTime
module.exports.makeScreen = makeScreen
module.exports.setNumberFormat = setNumberFormat
