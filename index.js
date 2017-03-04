//var sys = require('util');
var exec = require('child_process').execSync;

module.exports = {
	exportAll(){
		for(var i = 0; i <= 7; i++){
			exec('echo ' + i + " > /sys/class/gpio/export");
		}
	},

	export(id){
		exec('echo ' + id + " > /sys/class/gpio/export");
	},

	unexportAll(){
		for(var i = 0; i <= 7; i++){
			exec('echo ' + i + " > /sys/class/gpio/unexport");
		}
	},

	unexport(id){
		exec('echo ' + id + " > /sys/class/gpio/unexport");
	},

	read(id){
		return exec('/sys/class/gpio' + id);
	},

	write(id, state){
		if(state == 0 || state == 1){
			exec('echo ' + state + ' > /sys/class/gpio' + id);
		}
	},

	isChip(){
		return (exec('cat /proc/meminfo').split()[0] > 380) ? true : false;
	}
}


/*class GPIO{
	constructor(number, state){
		this.id = number;
		this.state = state;
	}
}
*/