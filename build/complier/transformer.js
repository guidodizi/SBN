"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("./parser");
var call_expressions_consts_1 = require("../consts/call-expressions.consts");
var MAGNIFIER = 5;
var HeadSVG = /** @class */ (function () {
    function HeadSVG(_attr, _body) {
        if (_attr === void 0) { _attr = []; }
        if (_body === void 0) { _body = []; }
        var _this = this;
        this._attr = _attr;
        this._body = _body;
        this.tag = "svg";
        this.attr = {
            width: 100 * MAGNIFIER,
            height: 100 * MAGNIFIER,
            viewBox: "0 0 " + 100 * MAGNIFIER + " " + 100 * MAGNIFIER,
            xmlns: "http://www.w3.org/2000/svg",
            version: "1.1"
        };
        // modify preset attributes to given
        Object.keys(_attr).map(function (key) {
            _this.attr[key] = _attr[key];
        });
        this.body = _body;
    }
    return HeadSVG;
}());
exports.HeadSVG = HeadSVG;
var RectSVG = /** @class */ (function () {
    function RectSVG(_attr) {
        if (_attr === void 0) { _attr = []; }
        var _this = this;
        this._attr = _attr;
        this.tag = "rect";
        this.attr = {
            x: 0,
            y: 0,
            width: 100 * MAGNIFIER,
            height: 100 * MAGNIFIER,
            fill: "rgb(100%,100%,100%)"
        };
        // modify preset attributes to given
        Object.keys(_attr).map(function (key) {
            _this.attr[key] = _attr[key];
        });
    }
    return RectSVG;
}());
exports.RectSVG = RectSVG;
var LineSVG = /** @class */ (function () {
    function LineSVG(_attr) {
        if (_attr === void 0) { _attr = []; }
        var _this = this;
        this._attr = _attr;
        this.tag = "line";
        this.attr = {};
        // modify preset attributes to given
        Object.keys(_attr).map(function (key) {
            _this.attr[key] = _attr[key];
        });
    }
    return LineSVG;
}());
exports.LineSVG = LineSVG;
function transformer(ast) {
    var headSVG = new HeadSVG();
    var penColor = 100; // default pen color
    // Extract a call expression at a time as `node`. Loop until we are out of expressions on body
    while (ast.body.length > 0) {
        var node = ast.body.shift();
        if (node instanceof parser_1.CallExpression) {
            switch (node.name) {
                case call_expressions_consts_1.PAPER: {
                    var paperColor = node.arguments[0].value;
                    headSVG.body.push(new RectSVG({
                        fill: "rgb(" + paperColor + "%," + paperColor + "%," + paperColor + "%)"
                    }));
                    break;
                }
                case call_expressions_consts_1.PEN: {
                    penColor = node.arguments[0].value;
                    break;
                }
                case call_expressions_consts_1.LINE: {
                    var lineNode = node;
                    var x1 = lineNode.arguments[0].value;
                    var y1 = lineNode.arguments[1].value;
                    var x2 = lineNode.arguments[2].value;
                    var y2 = lineNode.arguments[3].value;
                    headSVG.body.push(new LineSVG({
                        x1: x1 * MAGNIFIER,
                        y1: y1 * MAGNIFIER,
                        x2: x2 * MAGNIFIER,
                        y2: y2 * MAGNIFIER,
                        stroke: "rgb(" + penColor + "%," + penColor + "%," + penColor + "%)",
                        "stroke-linecap": "round"
                    }));
                    break;
                }
            }
        }
    }
    return headSVG;
}
exports.default = transformer;
