"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./complier/index"));
var fs = require("fs");
var args = require("minimist")(process.argv.slice(2));
var file = args["_"][0];
// console.log(JSON.stringify(args));
if (file === undefined) {
    throw new Error("Define route of DBN file!");
}
if (file.split(".")[file.split(".").length - 1] !== "dbn") {
    throw new Error("File given is not a DBN file!");
}
var code = "";
code = fs.readFileSync(process.cwd() + "/" + file, "utf8");
var sbn = new index_1.default();
var fileName = file.split(".dbn")[0];
if (args["log"]) {
    var lexer = sbn.lexer(code);
    writeFile(fileName + "_lexer.json", JSON.stringify(lexer));
    var parser = sbn.parser(lexer);
    writeFile(fileName + "_parser.json", JSON.stringify(parser));
    var transformer = sbn.transformer(parser);
    writeFile(fileName + "._transformer.json", JSON.stringify(transformer));
    var generator = sbn.generator(transformer);
    writeFile(fileName + ".html", generator);
    console.log("SVG complied & logged!");
}
else {
    var svg = sbn.complie(code);
    writeFile(fileName + ".html", svg);
    console.log("SVG complied!");
}
function writeFile(fileName, svg) {
    fs.writeFileSync(process.cwd() + "/" + fileName, svg);
}
