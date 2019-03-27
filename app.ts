import SBN from "./complier/index";
import fs = require("fs");
const args = require("minimist")(process.argv.slice(2));

const file = args["_"][0];
// console.log(JSON.stringify(args));
if (file === undefined) {
  throw new Error("Define route of DBN file!");
}
if (file.split(".")[file.split(".").length - 1] !== "dbn") {
  throw new Error("File given is not a DBN file!");
}

let code = "";
code = fs.readFileSync(`${process.cwd()}/${file}`, "utf8");
const sbn = new SBN();

const fileName = file.split(".dbn")[0];
if (args["log"]) {
  const lexer = sbn.lexer(code);
  writeFile(`${fileName}_lexer.json`, JSON.stringify(lexer));

  const parser = sbn.parser(lexer);
  writeFile(`${fileName}_parser.json`, JSON.stringify(parser));

  const transformer = sbn.transformer(parser);
  writeFile(`${fileName}._transformer.json`, JSON.stringify(transformer));

  const generator = sbn.generator(transformer);
  writeFile(`${fileName}.html`, generator);

  console.log("SVG complied & logged!");
} else {
  const svg = sbn.complie(code);
  writeFile(`${fileName}.html`, svg);
  console.log("SVG complied!");
}

function writeFile(fileName: string, svg: string) {
  fs.writeFileSync(`${process.cwd()}/${fileName}`, svg);
}
