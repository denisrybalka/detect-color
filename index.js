const { colorList } = require("./colorBase.json");

function detectColor(color) {
  if (typeof color !== "string") {
    return {
      detectedColor: null,
      input: color,
      errorMessage: "you must provide a string as value",
      error: true,
    };
  } else if (
    color.length < 10 ||
    color.length > 16 ||
    color
      .slice(4, -1)
      .split(",")
      .map((a) => +a)
      .includes(NaN) ||
    color
      .slice(4, -1)
      .split(",")
      .filter((a) => a.length > 0)
      .map((a) => +a).length !== 3
  ) {
    // check if length is possible, check if string spelling is possible
    return {
      detectedColor: null,
      input: color,
      errorMessage: `you must provide a correct string value. for example: "rgb(100,200,100)"`,
      error: true,
    };
  } else {
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
}

module.exports = detectColor;
