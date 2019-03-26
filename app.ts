import SBN from "./complier/index";
import fs = require("fs");
// const code = `
// Paper 100
// Pen 0
// Line 0 0 100 100
// Line 100 0 0 100
// `;

if (process.argv[2] === undefined) {
  throw new Error("Define route of DBN file!");
}

let code = "";
code = fs.readFileSync(`${process.cwd()}/${process.argv[2]}`, "utf8");
const sbn = new SBN();
const svg = sbn.complie(code);
const fileName = process.argv[2].split(".dbn")[0];
fs.writeFileSync(
  `${process.cwd()}/${fileName}.html`,
  `
<html>
<head></head>
<body>
  ${svg}
</body>
</html>
`
);
console.log("SVG complied!");
