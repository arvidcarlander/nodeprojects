// Utilities for handling the data in general.json

var sourceData=require('./general.json')
var debug = false




var by28 = {}
for (const host in sourceData.w1) {
	debug && console.log(`host is: ${host}`)
	for (const name in sourceData.w1[host]) {
		debug && console.log(`name is: ${name}`)
		//console.log(by28[sourceData.w1[host][name].device)
		var this28=sourceData.w1[host][name]["device"]
		debug && console.log("this28 is: " + this28)
		by28[this28] = name
	
	}
}
debug &&console.log("by28 is: ")
debug &&console.dir(by28)

var byName = []
for (const type in sourceData) {
	for (const host in sourceData[type]) {
		debug && console.log(`host is: ${host}`)
		for (const name in sourceData[type][host]) {
			debug && console.log(`name is: ${name}`)
			//console.log(byName[sourceData[type][host][name].device)
			var device=sourceData[type][host][name]["device"]
			debug && console.log("device is: " + device)
			byName.push({
				name: 	name,
				device:	device,
				type:	type,
				host:	host

		
			})
		}
	}
}



exports.sourceData=sourceData
exports.by28=by28
exports.byName=byName
