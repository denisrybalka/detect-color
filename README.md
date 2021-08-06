# detect-color
 Takes a string representing rgb code as input and outputs an object with the name of detected color. It works with 6 basic colors: red, green, blue, white, yellow, orange.
 
### Usage:
***
```js
import { detectColor } from 'detect-color';

let color = detectColor("rgb(230,23,23");
console.log(color.detectedColor); // => red
```