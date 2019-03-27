"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./complier/index"));
var fs = require("fs");
// if (process.argv[2] === undefined) {
//   throw new Error("Define route of DBN file!");
// }
var code = "\nPaper 100\nPen 0\nLine 0 0 100 100\n";
// code = fs.readFileSync(`${process.cwd()}/${process.argv[2]}`, "utf8");
var sbn = new index_1.default();
var svg = sbn.complie(code);
var fileName = process.argv[2].split(".dbn")[0];
fs.writeFileSync(process.cwd() + "/" + fileName + ".html", "\n<html>\n<head></head>\n<body>\n  " + svg + "\n</body>\n</html>\n");
console.log("SVG complied!");
