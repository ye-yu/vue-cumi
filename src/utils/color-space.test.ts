import { lab2rgb, rgb2lab, type RGB } from "./color-space.util.ts";

const color1: RGB = { r: 255, g: 0, b: 0 }; // Red
const color2: RGB = { r: 240, g: 100, b: 50 }; // A slightly different red

const lab1 = rgb2lab(color1);
const lab2 = rgb2lab(color2);
console.log("LAB1:", lab1);
console.log("LAB2:", lab2);


const labRGB1 = lab2rgb(lab1)
const labRGB2 = lab2rgb(lab2)
console.log("reconvert lab1:", labRGB1);
console.log("reconvert lab2:", labRGB2);

