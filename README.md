# GPIO-C.H.I.P 

How to use

```javascript
var GPIO = require('gpio-c.h.i.p');

GPIO.exportAll();

GPIO.unexportAll();

```

If you don´t export, is exported automatically.

Use ```GPIO.export(gpio_port)```
```javascript
GPIO.export(4);
```

Use ```GPIO.unexport(gpio_port)```
```javascript
GPIO.unexport(4);
```

Use ```GPIO.read(gpio_port)```
```javascript
var value = GPIO.read(0);
console.log(value);
```

Use ```GPIO.write(gpio_port, state)```
```javascript
GPIO.write(4, 0);
```

Use ```GPIO.write(gpio_port, state, direction)```
```javascript
GPIO.write(4, 1, GPIO.IN | GPIO.OUT);
```

Use ```GPIO.direction(gpio_port, direction)```
```javascript
GPIO.direction(4, GPIO.IN |	GPIO.OUT);
```

Use ```GPIO.isExported()```
```javascript
if(GPIO.isExported(4)){
	console.log("Yes");
}
```

Use ```GPIO.isChip()```
```javascript
if(GPIO.isChip()){
	console.log("Í´m better than RPI");
}
```

Objects ```new Gpio(gpio_port, direction)```
```javascript
var led = new Gpio(4, GPIO.OUT);
led.off(); // Value = 0;
led.on(); // Value = 1;
if(led.read() == 0){
	led.on();
}
```