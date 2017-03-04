//var sys = require('util');
var exec = require('child_process').execSync;

module.exports = {

	IN : "in",
	OUT : "out"
}
module.exports.exportAll = function(){
	for(var i = 0; i <= 7; i++){
		exec('echo ' + i + " > /sys/class/gpio/export");
	}
};

module.exports.export = function(id){
	exec('echo ' + id + " > /sys/class/gpio/export");
};

module.exports.unexportAll = function(){
	for(var i = 0; i <= 7; i++){
		exec('echo ' + i + " > /sys/class/gpio/unexport");
	}
};

module.exports.unexport = function(id){
	exec('echo ' + id + " > /sys/class/gpio/unexport");
};

module.exports.read = function(id){
	return exec('/sys/class/gpio' + id);
};

module.exports.write = function(id, state){
	if(state == 0 || state == 1){
		exec('echo ' + state + ' > /sys/class/gpio' + id);
	}
};

module.exports.isChip = function(){
	return (exec('cat /proc/meminfo').split()[0] > 380) ? true : false;
};

var Gpio = class Gpio{
	constructor(number, direction){
		this.id = number;
		this.direction = direction;
	}

	on(){
		module.exports.write(this.id, 1);
	}

	off(){
		module.exports.write(this.id, 0);
	}
};

module.exports.Gpio = Gpio;