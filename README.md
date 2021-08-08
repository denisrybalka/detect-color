# detect-color
 Takes a string representing RGB or HEX code as input and outputs an object with the name of closest detected CSS color name.
 Also it can detect shades of all basic colors *(for example: indianred, darkred and tomate are the shades of red color)*. 
  It uses [Euclid's distance formula](https://en.wikipedia.org/wiki/Euclidean_distance) in RGB dimension to calculate distance to closest color.
 
![gif](https://i.imgur.com/opzWdsV.gif)
 
 
 ### Install
 ***
 ```
 $ npm install detect-color
 ```

### Usage
***
```js
import { detectCssColor } from 'detect-color';

let color = detectCssColor("rgb(70,130,180)");
let color2 = detectCssColor("#00ff7f");

console.log(color.detectedColor); // => steelblue
console.log(color2.detectedColor); // => springgreen
```

### Detecting shades
***
As I said before, you can also detect shades of all basic colors. For example if you want to know if **palegreen** is a shade of **green** color, you can simply use ```detectColor()``` function. It takes rgb or hex code of your shade color and returns closest found color.
```js
import { detectColor } from 'detect-color';

let color = detectColor("#32cd32"); // limegreen
let color2 = detectColor("rgb(34,139,34)"); // forestgreen

console.log(color.detectedColor); // => green
console.log(color2.detectedColor); // => green

```
