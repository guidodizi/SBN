"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = require("./lexer");
var call_expressions_consts_1 = require("../consts/call-expressions.consts");
var ASTExpression = /** @class */ (function () {
    function ASTExpression(_body) {
        if (_body === void 0) { _body = []; }
        this._body = _body;
        this.type = "Drawing";
        this.body = [];
        this.body = _body;
    }
    return ASTExpression;
}());
exports.ASTExpression = ASTExpression;
var NumberExpression = /** @class */ (function () {
    function NumberExpression(_value) {
        this._value = _value;
        this.type = "NumberLiteral";
        this.value = _value;
    }
    return NumberExpression;
}());
exports.NumberExpression = NumberExpression;
var CallExpression = /** @class */ (function () {
    function CallExpression(_name) {
        this._name = _name;
        this.type = "CallExpression";
        this.name = _name;
    }
    return CallExpression;
}());
exports.CallExpression = CallExpression;
var PaperExpression = /** @class */ (function (_super) {
    __extends(PaperExpression, _super);
    function PaperExpression(_arguments) {
        if (_arguments === void 0) { _arguments = []; }
        var _this = _super.call(this, call_expressions_consts_1.PAPER) || this;
        _this._arguments = _arguments;
        _this.arguments = _arguments;
        return _this;
    }
    return PaperExpression;
}(CallExpression));
exports.PaperExpression = PaperExpression;
var PenExpression = /** @class */ (function (_super) {
    __extends(PenExpression, _super);
    function PenExpression(_arguments) {
        if (_arguments === void 0) { _arguments = []; }
        var _this = _super.call(this, call_expressions_consts_1.PEN) || this;
        _this._arguments = _arguments;
        _this.arguments = _arguments;
        return _this;
    }
    return PenExpression;
}(CallExpression));
exports.PenExpression = PenExpression;
var LineExpression = /** @class */ (function (_super) {
    __extends(LineExpression, _super);
    function LineExpression(_arguments) {
        if (_arguments === void 0) { _arguments = []; }
        var _this = _super.call(this, call_expressions_consts_1.LINE) || this;
        _this._arguments = _arguments;
        _this.arguments = _arguments;
        return _this;
    }
    return LineExpression;
}(CallExpression));
exports.LineExpression = LineExpression;
function parser(tokens) {
    var AST = new ASTExpression();
    var _loop_1 = function () {
        var currentToken = tokens.shift();
        // Since number tokens do nothing by itself, we only analyse syntax when we find LexerWord
        if (currentToken instanceof lexer_1.LexerWord) {
            switch (currentToken.value) {
                case call_expressions_consts_1.PAPER: {
                    var expression = new PaperExpression();
                    // if current token is CallExpression of type Paper, next token should be color argument
                    var argument = tokens.shift();
                    if (argument instanceof lexer_1.LexerNumber) {
                        expression.arguments.push(new NumberExpression(argument.value));
                        AST.body.push(expression);
                    }
                    else {
                        throw "Paper command must be followed by a number";
                    }
                    break;
                }
                case call_expressions_consts_1.PEN: {
                    var expression = new PenExpression();
                    // if current token is CallExpression of type Paper, next token should be color argument
                    var argument = tokens.shift();
                    if (argument instanceof lexer_1.LexerNumber) {
                        expression.arguments.push(new NumberExpression(argument.value));
                        AST.body.push(expression);
                    }
                    else {
                        throw "Pen command must be followed by a number";
                    }
                    break;
                }
                case call_expressions_consts_1.LINE: {
                    var expression_1 = new LineExpression();
                    // if current token is CallExpression of type Paper, next token should be color argument
                    var args = tokens.splice(0, 4);
                    if (args.every(function (arg) { return arg instanceof lexer_1.LexerNumber; })) {
                        args.map(function (arg) {
                            expression_1.arguments.push(new NumberExpression(arg.value));
                        });
                        AST.body.push(expression_1);
                    }
                    else {
                        throw "Line command must be followed by a four number arguments";
                    }
                    break;
                }
            }
        }
    };
    // extract a token at a time as currentToken. Loop until we are out of tokens
    while (tokens.length > 0) {
        _loop_1();
    }
    return AST;
}
exports.default = parser;
