// Utilities for handling the data in general.json

var byname=require('./general.json')



var by28 = {}
for (const host in byname.w1) {
	console.log(`host is: ${host}`)
	for (const name in byname.w1[host]) {
		console.log(`name is: ${name}`)
		//console.log(by28[byname.w1[host][name].device)
		this28=byname.w1[host][name]["device"]
		console.log("this28 is: " + this28)
		by28[this28] = name
		console.dir(by28)
	
	}
}



data={"by28":by28, "byname":byname}
exports.data = data
