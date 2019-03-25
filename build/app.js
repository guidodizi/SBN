"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./complier/index"));
var code = "\nPaper 0 \nPen 100 \nLine 0 50 100 50\n";
var s = new index_1.default();
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
