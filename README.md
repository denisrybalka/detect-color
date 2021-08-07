# detect-color
 Takes a string representing RGB or HEX code as input and outputs an object with the name of detected color. It works with all basic colors: red, green, blue, white, yellow, orange, black, pink, purple.
 
 ### Install
 ***
 ```
 $ npm install detect-color
 ```

### Usage
***
```js
import detectColor from 'detect-color';

let color = detectColor("rgb(230,23,23");
let color2 = detectColor("#fdfdfd");

console.log(color.detectedColor); // => red
console.log(color2.detectedColor) // => white
```