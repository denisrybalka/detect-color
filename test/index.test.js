const { detectColor, detectCssColor } = require("../index");

test("properly detects RGB colors", () => {
  expect(detectColor("rgb(100,5,30)")).toEqual(
    expect.objectContaining({ error: false })
  );
  expect(detectColor("rgb(20,50,400)")).toEqual(
    expect.objectContaining({ error: true })
  ); // can't be more than 255
  expect(detectColor("rgb(128,5,-100)")).toEqual(
    expect.objectContaining({ error: true })
  ); // can't be less than 0
  expect(detectColor("rgb(100,5,30")).toEqual(
    expect.objectContaining({ error: true })
  ); // wrong style
  expect(detectColor("rgb[100,100,100]")).toEqual(
    expect.objectContaining({ error: true })
  ); // wrong style
});

test("properly detects HEX colors", () => {
  expect(detectColor("#fff")).toEqual(
    expect.objectContaining({ detectedColor: "white" })
  );
  expect(detectColor("#ee1313")).toEqual(
    expect.objectContaining({ detectedColor: "red" })
  );
  expect(detectColor("#1313ee")).toEqual(
    expect.objectContaining({ detectedColor: "blue" })
  );
  expect(detectColor("##1313ee")).toEqual(
    expect.objectContaining({ error: true })
  ); // wrong style
  expect(detectColor("#1313")).toEqual(
    expect.objectContaining({ error: true })
  ); // wrong style
  expect(detectColor("fff")).toEqual(expect.objectContaining({ error: true })); // wrong style
  expect(detectColor("ffffff")).toEqual(
    expect.objectContaining({ error: true })
  ); // wrong style
  expect(detectColor("9#99999")).toEqual(
    expect.objectContaining({ error: true })
  ); // wrong style
});

test("properly detects closest CSS colors", () => {
  expect(detectCssColor("#f0f8ff")).toEqual(
    expect.objectContaining({ detectedColor: "aliceblue" })
  );
  expect(detectCssColor("rgb(232,116,67)")).toEqual(
    expect.objectContaining({ detectedColor: "coral" })
  );
  expect(detectCssColor("b53c3c")).toEqual(
    expect.objectContaining({ error: true })
  ); // wrong style
  expect(detectCssColor("sdsdsds")).toEqual(
    expect.objectContaining({ error: true })
  ); // wrong style
  expect(detectCssColor("##fdsfsd")).toEqual(
    expect.objectContaining({ error: true })
  ); // wrong style
  expect(detectCssColor("rgb(0,0,-1)")).toEqual(
    expect.objectContaining({ error: true })
  ); // can't be less than 0
});
