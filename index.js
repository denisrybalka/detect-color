/**
 * detect-color
 *
 * @author Denis Rybalka <denis.rubalka1@gmail.com>
 * @description converts rgb/hex code to CSS color names
 *
 * @param  {String} rgb or hex code
 * @return {Object} object with detected color value
 */

const hex2rgb = require("hex2rgb");
const { colorList, cssColorList } = require("./colorBase.json");

function calcEuclidDistance({r,g,b}, color) {
  const [r1,g1,b1] = color
    .slice(4, color.length - 1)
    .split(",")
    .map((el) => +el);

  const distance = Math.sqrt(
    Math.pow(r - r1, 2) + Math.pow(g - g1, 2) + Math.pow(b - b1, 2)
  );

  return distance;
}

function findClosestColor(color, isFindClosestCssColor = false) { // takes rgb code string, calc closest color
  const [r, g, b] = color
    .slice(4, -1)
    .split(",")
    .map((a) => +a);

  let smallestDistance = +Infinity;
  let currentColor;
  
  if (!isFindClosestCssColor) {
    for (let key in colorList) {
      colorList[key].map((a) => {
        const distance = calcEuclidDistance({r,g,b}, a);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          currentColor = key;
        }
      });
    }
  } else {
    for (let key in cssColorList) {
      const cssColor = hex2rgb(cssColorList[key]).rgbString;
      const distance = calcEuclidDistance({r,g,b}, cssColor);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        currentColor = key;
      }
    }
  }

  return {
    detectedColor: currentColor,
    input: color,
    error: false,
  };
}

function detectColor(color, isFindClosestCssColor = false) {
  if (typeof color !== "string") {
    return {
      detectedColor: null,
      input: color,
      errorMessage: "you must provide a string as value",
      error: true,
    };
  } else {
    if (!!color.match(/rgb\(\s*(?:(?:\d{1,2}|1\d\d|2(?:[0-4]\d|5[0-5]))\s*,?){3}\)$/)) { // rgb code check
      return findClosestColor(color, isFindClosestCssColor);
    } else if (!!color.match(/^#([0-9A-F]{3}){1,2}$/i)) { // hex code check
      const convertedToRgb = hex2rgb(color).rgbString;
      return findClosestColor(convertedToRgb, isFindClosestCssColor);
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

function detectCssColor(color) {
  return detectColor(color, true);
}


console.log(detectCssColor("#00ff7f"))

module.exports = { detectColor,detectCssColor };
