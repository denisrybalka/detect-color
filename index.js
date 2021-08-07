/**
 * detect-color
 *
 * @author Denis Rybalka <denis.rubalka1@gmail.com>
 * @description converts rgb/hex code to normal color names
 *
 * @param  {String} rgb or hex code
 * @return {Object} object with detected color value
 */


const hex2rgb = require("hex2rgb");
const { colorList } = require("./colorBase.json");

function findClosestColor(color) { // takes rgb code string, calc closest color
  const [r, g, b] = color
    .slice(4, -1)
    .split(",")
    .map((a) => +a);

  let smallestDistance = +Infinity;
  let currentColor;

  for (let key in colorList) {
    colorList[key].map((a) => {
      const r1 = a
        .slice(4, a.length - 1)
        .split(",")
        .map((el) => +el)[0];
      const g1 = a
        .slice(4, a.length - 1)
        .split(",")
        .map((el) => +el)[1];
      const b1 = a
        .slice(4, a.length - 1)
        .split(",")
        .map((el) => +el)[2];

      const distance = Math.sqrt(
        Math.pow(r - r1, 2) + Math.pow(g - g1, 2) + Math.pow(b - b1, 2)
      );

      if (distance < smallestDistance) {
        smallestDistance = distance;
        currentColor = key;
      }
    });
  }

  return {
    detectedColor: currentColor,
    input: color,
    error: false,
  };
}

function detectColor(color) {
  if (typeof color !== "string") {
    return {
      detectedColor: null,
      input: color,
      errorMessage: "you must provide a string as value",
      error: true,
    };
  } else {
    if (!!color.match(/rgb\(\s*(?:(?:\d{1,2}|1\d\d|2(?:[0-4]\d|5[0-5]))\s*,?){3}\)$/)) { // rgb code check
      return findClosestColor(color);
    } else if (!!color.match(/^#([0-9A-F]{3}){1,2}$/i)) { // hex code check
      const convertedToRgb = hex2rgb(color).rgbString;
      return findClosestColor(convertedToRgb);
    } else {
      return {
        detectedColor: null,
        input: color,
        errorMessage: `you must provide a correct string value`,
        error: true,
      };
    }
  }
}

module.exports = detectColor;
