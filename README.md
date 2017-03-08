# GPIO-C.H.I.P 

How to use

```javascript
<<<<<<< HEAD
var GPIO = require('gpio-c.h.i.p');
=======
var GPIO = require('GPIO-C.H.I.P');
>>>>>>> origin/master

GPIO.exportAll();

GPIO.unexportAll();

```

If you don´t export, is exported automatically.


Use ```GPIO.read(gpio_port)```
```javascript
var value = GPIO.read(0);
console.log(value);
```

Use ```GPIO.write(gpio_port, state)```
```javascript
var value = GPIO.read(0);
console.log(value);
```
