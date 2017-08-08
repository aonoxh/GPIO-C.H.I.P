# GPIO-C.H.I.P 

How to use

```javascript
var GPIO = require('gpio-c.h.i.p');

GPIO.exportAll();

GPIO.unexportAll();

```



Object ```new GPIO.Gpio(gpio_port, direction)```
```javascript
var led = new Gpio(4, GPIO.OUT);
led.off(); // Value = 0;
led.on(); // Value = 1;
if(led.read() == 0){
	led.on();
}

var btn = new Gpio(4, GPIO.IN);
btn.rising((value) => {
	console.log("RISING...");
});

btn.falling((value) => {
	console.log("FALLING...");
});
btn.both((type, value) => {
	console.log(type,"...");
});
```
