var os = require('os');
var fs = require('fs');

module.exports = {
	IN : "in",
	OUT : "out",
	HIGH : "1",
	LOW : "0",
	RISING: "rising",
	FALLING: "falling",
	BOTH: "both",
	NONE: "none"
};

var PINS;

if(os.release().startsWith("4.4.13-ntc-mlc")){
	PINS = [1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020];
}else if(os.release().startsWith("4.4")){
	PINS = [1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023];
}else{
	PINS = [408, 409, 410, 411, 412, 413, 414, 415];
}

module.exports.export = (pin) => {
	if(module.exports.isChip()){
		if(!module.exports.isExported(pin)){
			fs.writeFileSync("/sys/class/gpio/export", PINS[pin]);
		}		
	}
}

module.exports.exportAll = () => {
	if(module.exports.isChip()){
		for(var i = 0; i <= 7; i++){
			if(!module.exports.isExported(i)){
				module.exports.export(i);
			}
		}
	}
}

module.exports.unexport = (pin) => {
	if(module.exports.isChip()){
		if(module.exports.isExported(pin)){
			fs.writeFileSync("/sys/class/gpio/unexport", PINS[pin]);
		}
	}	
}

module.exports.unexportAll = () => {
	if(module.exports.isChip()){
		for(var i = 0; i <= 7; i++){
			module.exports.unexport(i);
		}
	}
}

module.exports.direction = (pin, direction) => {
	if(module.exports.isChip()){
		if(module.exports.isExported(pin)){
			fs.writeFileSync("/sys/class/gpio/gpio" + PINS[pin] +"/direction", direction);
		}
	}
}

module.exports.read = (pin) => {
	if(module.exports.isChip()){
		if(module.exports.isExported(pin)){
			return fs.readFileSync('/sys/class/gpio/gpio'+ PINS[pin] + "/value").toString().replace("\n", "");
		}
	}
}

module.exports.write = (pin, value, direction) => {
	if(module.exports.isChip()){
		if(module.exports.isExported(pin)){
			module.exports.direction(pin, direction);
			fs.writeFileSync('/sys/class/gpio/gpio' + PINS[pin] + "/value", value);
		}
	}
}

module.exports.edge = (pin, type, callback) => {
	if(module.exports.isChip()){
		if(module.exports.isExported(pin)){
			
		}
	}
}

module.exports.on = (pin) => {
	if(module.exports.isChip()){
		if(module.exports.isExported(pin)){
			module.exports.direction(pin, module.exports.OUT);
			fs.writeFileSync('/sys/class/gpio/gpio' + PINS[pin] + "/value", module.exports.HIGH);
		}		
	}
}

module.exports.off = (pin) => {
	if(module.exports.isChip()){
		if(module.exports.isExported(pin)){
			module.exports.direction(pin, module.exports.OUT);
			fs.writeFileSync('/sys/class/gpio/gpio' + PINS[pin] + "/value", module.exports.LOW);
		}
	}
}

module.exports.isExported = (pin) => {
	if (module.exports.isChip()) {
		try{
			fs.accessSync('/sys/class/gpio/gpio' + PINS[pin], fs.R_OK | fs.W_OK);
		}catch(e){
			return false;
		}

		return true;
	}
}

module.exports.isChip = () => {
	return (os.arch().startsWith('arm'))
	&& fs.existsSync('/sys/class/gpio');
}

/* GPIO CLASS*/
var Gpio = function Gpio(number, direction){
	this.pin = number;
	this.direction = direction;
	module.exports.export(this.pin);
}

Gpio.prototype.on = function(){
	module.exports.write(this.pin, 1, this.direction);
}

Gpio.prototype.off = function(){
	module.exports.write(this.pin, 0, this.direction);
}

Gpio.prototype.read = function(){
	return module.exports.read(this.pin);
}

Gpio.prototype.rising = (callback) => {

}

Gpio.prototype.falling = (callback) => {
	
};

module.exports.Gpio = Gpio;
/* GPIO CLASS END :C*/

//SYNTAX EXAMPLES

/*
GPIO.edge(1,  (GPIO.BOTH | GPIO.RISING | GPIO.FALLING), (edge, value) => {
	if(edge.equals(GPIO.RISING)){
		console.log(edge, value);
	}else{
		console.log(edge, value);
	}
});
*/
