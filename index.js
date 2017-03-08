var os = require('os');
var fs = require('fs');

var MAP;

if (os.release().startsWith("4.4.13-ntc-mlc")) {
	MAP = [1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020];
} else if (os.release().startsWith("4.4")) {
  	MAP = [1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023];
} else {
  	MAP = [408, 409, 410, 411, 412, 413, 414, 415];
}

module.exports = {
	IN : "in",
	OUT : "out"
};

module.exports.exportAll = function(){
	if(module.exports.isChip()){
		for(var i = 0; i <= MAP.length; i++){
			if(!module.exports.isExported(MAP[i])){
				module.exports.export(MAP[i]);
			}
		}
	}
};

module.exports.export = function(id){
	if(module.exports.isChip()){
		fs.writeFileSync("/sys/class/gpio/export", MAP[id]);
	}	
};

module.exports.unexportAll = function(){
	if(module.exports.isChip()){
		for(var i = 0; i <= 7; i++){
			if(module.exports.isExported(MAP[i])){
				module.exports.unexport(MAP[i]);
			}
		}
	}	
};

module.exports.unexport = function(id){
	if(module.exports.isChip()){
		fs.writeFileSync("/sys/class/gpio/unexport", MAP[id]);
	}	
};

module.exports.direction = function(id, direction){
	if(module.exports.isChip()){
		if(!module.exports.isExported(id)){
			module.exports.export(id);
		}
		fs.writeFileSync("/sys/class/gpio/gpio" + MAP[id] +"/direction", direction);
	}
};

module.exports.read = function(id){
	if(module.exports.isChip()){
		if(!module.exports.isExported(id)){
			module.exports.export(id);
		}
		return fs.readFileSync('/sys/class/gpio/gpio'+ MAP[id] + "/value").toString().replace("\n", "");
	}
};

module.exports.write = function(id, state){
	if(module.exports.isChip()){
		if(!module.exports.isExported(id)){
			module.exports.export(id);
		}
		if(state == 0 || state == 1){
			fs.writeFileSync('/sys/class/gpio/gpio' + MAP[id] + "/value", state);
		}
	}	
};

module.exports.write = function(id, state, direction){
	if(module.exports.isChip()){
		if(!module.exports.isExported(id)){
			module.exports.export(id);
		}
		if(state == 0 || state == 1){
			module.exports.direction(id, direction);
			fs.writeFileSync('/sys/class/gpio/gpio' + MAP[id] + "/value", state);
		}
	}	
};

module.exports.isExported = function(id){
	if (module.exports.isChip()) {
		try{
			fs.accessSync('/sys/class/gpio/gpio' + MAP[id], fs.R_OK | fs.W_OK);
		}catch(e){
			return false;
		}

		return true;
	}
}

module.exports.isChip = function(){
	return (os.release().startsWith("4.4.13-ntc-mlc")) ? true : false;
};

var Gpio = function Gpio(number, direction){
	this.id = number;
	this.direction = direction;
	module.exports.export(number);
}

Gpio.prototype.on = function(){
	module.exports.write(this.id, 1, direction);
}

Gpio.prototype.off = function(){
	module.exports.write(this.id, 0, direction);
}

Gpio.prototype.read = function(){
	return module.exports.read(this.id);
}

module.exports.Gpio = Gpio;