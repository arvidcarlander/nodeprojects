var telldus = require("./telldus.js")
var general = require("./general.js")
const { LiveApi } = require('telldus-api');

// Max age for Telldus info in seconds
var maxAgeTelldus = 30 * 60 

var debug = true

const api = new LiveApi({
  key: 'FEHUVEW84RAFR5SP22RABURUPHAFRUNU', // publicKey
  secret: 'ZUXEVEGA9USTAZEWRETHAQUBUR69U6EF', // privateKey
  tokenKey: 'a16ce8e245888fa36cec8f816719148405f90237b', // token
  tokenSecret: '9dfdc7e45ea6a59bb97af8caecb5222f', // tokensecret
});

/*
const promise1 = new Promise ((resolve,reject) => {
 
	console.log("Calling Telldus")
	const fubar = telldus.api.getSensorInfo("1540043414")
		.then(sensorInfo => resolve(sensorInfo)
		)

})

async function xxx () {
	const d = await Promise.all([promise1])

	console.log("+++++++++++++++++++++++ d[0] is: ")
	console.dir( d[0])
	console.log("+++++++++++++++++++++++ end d[0]")
}

xxx()
*/

function getTelldus(id,req,res) {
	const fubar = telldus.api.getSensorInfo(id)
		.then(sensorInfo => {
			//sensorInfo.JSON = JSON.parse(sensorInfo)
			//res.send(sensorInfo.JSON.id)
			//res.send(sensorInfo.data[0].value)
			debug = false
			debug && console.dir(sensorInfo)

			let temp = "0"
			if (  sensorInfo && sensorInfo.data && sensorInfo.data[0]) {
				allJSON=sensorInfo.data[0]
				name=sensorInfo.name
				temp=sensorInfo.data[0].value

				if(sensorInfo.data[0].name != "temp") {
					console.log("Error: Telldus returned no temp. Humidity?")
					temp = "0"
					name = "unknown"
					allJSON={}
				}
			} else {
				console.log("Error: Telldus returned nothing. Unknown device?")
				name = "unknown"
				allJSON={}
			}

			let now = new Date()
			let nowTimeStamp = now.getTime() / 1000
			let telldusLastUpdated =  parseFloat(sensorInfo.lastUpdated) 
			let ageSeconds = nowTimeStamp - telldusLastUpdated
			if(ageSeconds >= maxAgeTelldus) {
				debug && console.log("Too old: age is: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" + ageSeconds)
				debug && console.log("NowTimestamp is: " + nowTimeStamp)
				debug && console.log("telldusLastUpdated is: " + telldusLastUpdated)
				debug && console.log("Age in seconds is: " + ageSeconds)
				debug && console.log("MaxAgeTelldus is: " + maxAgeTelldus)
				temp = "-"
				allJSON.value="-"
			}else{
				debug && console.log("Not too old: age is: " + ageSeconds)
			}



			temp=general.setNumberFormat(temp)

			switch (req.params.fmt) {
				case "raw":
					res.send(temp)
					break
				case "number":
					res.send(temp)
					break
				case "json":
					// Standard format
					res.json( { "name" : name, "temp" : temp})
					break
				case "rawjson":
					// Return the unadulterated JSON
					res.json(allJSON)
					//console.dir(allJSON)
					break
				default:
					res.send("Unknown format in API request")
			
			}
		})
}


module.exports.api=api
module.exports.getTelldus = getTelldus
