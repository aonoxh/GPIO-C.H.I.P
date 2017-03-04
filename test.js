var GPIO = require('./index');

//GPIO.exportAll();

var led = new GPIO.Gpio(0, GPIO.IN);

//console.log(GPIO.IN);