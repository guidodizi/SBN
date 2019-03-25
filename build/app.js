"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./complier/index"));
var express = require("express");
var code = "\nPaper 100 \nPen 0\nLine 0 0 100 100\nLine 100 0 100 0\n";
var sbn = new index_1.default();
// Create a new express application instance
var app = express();
app.get("/", function (req, res) {
    res.send(sbn.complie(code));
});
app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
