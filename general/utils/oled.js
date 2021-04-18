var i2c = require('i2c-bus'),
  i2cBus = i2c.openSync(1),
  oled = require('oled-i2c-bus');
var font = require('oled-font-5x7')

var opts = {
  width: 128,
  height: 64,
  address: 0x3C
};

let linefeed=15
let debug = true

var oled = new oled(i2cBus, opts);

let x=0
let y=0

//oled.writeString(font,2,'    ready',1,true)

function clear () {
	x=0
	y=0
	oled.clearDisplay()
	oled.setCursor(x,y)
}

function writeLine (textString) {
	debug && console.log("writeLine: Handling string: " + textString)
	oled.writeString(font,2,textString,1,true)
	newLine()
}
function newLine () {
	debug && console.log("newLine ")
	x=0
	y=y+linefeed
	oled.setCursor(x,y)
}
	
function writeLines (textArray) {
	clear()
	if ( ! Array.isArray(textArray)) {
		debug && console.log("writeLines: Found string: " + textLine)
		let textLine = textArray
		writeLine(textLine)
	} else {
		debug && console.log("writeLines: Found array: ")
		debug && console.dir(textArray)
		for( let i = 0; i < textArray.length;i++) {
			writeLine(textArray[i])
		}
	}
	
}

//clear()

//writeLine(font,2,'    Ready',1,true)

module.exports.oled=oled
module.exports.writeLines=writeLines
module.exports.writeLine=writeLine
module.exports.newLine=newLine
module.exports.clear=clear
module.exports.clear=clear
