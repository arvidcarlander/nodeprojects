// Utilities for handling the data in general.json

var sourceData=require('./general.json')
var debug = false


// Same data as objects keyed on the w1 28 code
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

// Same data as an array of objects and as object indexed by name
var asArray = []
var byName = {}
var byHost = {}
for (const type in sourceData) {
	for (const host in sourceData[type]) {
		debug && console.log(`host is: ${host}`)
		for (const name in sourceData[type][host]) {
			debug && console.log(`name is: ${name}`)
			//console.log(byName[sourceData[type][host][name].device)
			var device=sourceData[type][host][name]["device"]
			debug && console.log("device is: " + device)
			newObject = {
				type:	type,
				host:	host,
				name: 	name,
				device:	device
		
			}
			asArray.push(newObject)
			byName[name]=newObject
			byHost[host]=newObject
		}
	}
}




exports.sourceData=sourceData	// Original general.json objects: {type, {host, {name, {label, device}}}}
exports.by28=by28		// Objects keyed by w1 28 number
exports.asArray=asArray		// Same data as an array of objects
exports.byName=byName		// Objects keyed by name
exports.byHost=byHost		// Objects keyed by name
