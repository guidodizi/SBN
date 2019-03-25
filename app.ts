import SBN from "./complier/index";

const code = `
Paper 0 
Pen 100 
Line 0 50 100 50
`;
const s = new SBN();

console.log("asd");
console.log(s.complie(code));
// import express = require('express');

// // Create a new express application instance
// const app: express.Application = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });
