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
    function ASTExpression(body) {
        if (body === void 0) { body = []; }
        this.type = "Drawing";
        this.body = [];
        this.body = body;
    }
    return ASTExpression;
}());
exports.ASTExpression = ASTExpression;
var NumberExpression = /** @class */ (function () {
    function NumberExpression(value) {
        this.type = "NumberLiteral";
        this.value = value;
    }
    return NumberExpression;
}());
exports.NumberExpression = NumberExpression;
var CommentExpression = /** @class */ (function () {
    function CommentExpression(value) {
        if (value === void 0) { value = ""; }
        this.type = "CommentExpression";
        this.value = value;
    }
    return CommentExpression;
}());
exports.CommentExpression = CommentExpression;
var CallExpression = /** @class */ (function () {
    function CallExpression(name) {
        this.type = "CallExpression";
        this.name = name;
    }
    return CallExpression;
}());
exports.CallExpression = CallExpression;
var PaperExpression = /** @class */ (function (_super) {
    __extends(PaperExpression, _super);
    function PaperExpression(args) {
        if (args === void 0) { args = []; }
        var _this = _super.call(this, call_expressions_consts_1.PAPER) || this;
        _this.args = args;
        return _this;
    }
    return PaperExpression;
}(CallExpression));
exports.PaperExpression = PaperExpression;
var PenExpression = /** @class */ (function (_super) {
    __extends(PenExpression, _super);
    function PenExpression(args) {
        if (args === void 0) { args = []; }
        var _this = _super.call(this, call_expressions_consts_1.PEN) || this;
        _this.args = args;
        return _this;
    }
    return PenExpression;
}(CallExpression));
exports.PenExpression = PenExpression;
var LineExpression = /** @class */ (function (_super) {
    __extends(LineExpression, _super);
    function LineExpression(args) {
        if (args === void 0) { args = []; }
        var _this = _super.call(this, call_expressions_consts_1.LINE) || this;
        _this.args = args;
        return _this;
    }
    return LineExpression;
}(CallExpression));
exports.LineExpression = LineExpression;
function findArguments(tokens, command, cantArgs, expectedTypes) {
    // get arguments
    var args = tokens.splice(0, cantArgs);
    // found less arguments than expected
    if (args.length !== cantArgs)
        throw command + " expected " + cantArgs + " arguments, but found only " + args.length;
    // type check arguments
    var positionArgument = 0;
    var argsTypeCheck = args.some(function (arg, index) {
        if (arg.type !== expectedTypes[index]) {
            positionArgument = index;
            return false;
        }
        else
            return true;
    });
    // typecheck of arguments failed
    if (!argsTypeCheck)
        throw command + " takes on parameter " + (positionArgument + 1) + " a " + expectedTypes[positionArgument] + ". Found an argument of type " + args[positionArgument].type;
    return {
        newTokens: tokens.slice(),
        expressionArgs: args.map(function (arg) {
            if (arg instanceof lexer_1.LexerNumber) {
                return new NumberExpression(arg.value);
            }
            else if (arg instanceof lexer_1.LexerWord) {
                throw "Not implemented yet";
            }
        })
    };
}
function parser(tokens) {
    var AST = new ASTExpression();
    // extract a token at a time as currentToken. Loop until we are out of tokens
    while (tokens.length > 0) {
        var currentToken = tokens.shift();
        // Since number tokens do nothing by itself, we only analyse syntax when we find LexerWord
        if (currentToken instanceof lexer_1.LexerWord) {
            switch (currentToken.value) {
                case call_expressions_consts_1.COMMENT: {
                    var expression = new CommentExpression();
                    var next = tokens.shift();
                    while (next.type !== "newline") {
                        expression.value += next.value + " ";
                        next = tokens.shift();
                    }
                    AST.body.push(expression);
                    break;
                }
                case call_expressions_consts_1.PAPER: {
                    var expression = new PaperExpression();
                    var _a = findArguments(tokens, call_expressions_consts_1.PAPER, 1, ["number"]), newTokens = _a.newTokens, expressionArgs = _a.expressionArgs;
                    tokens = newTokens;
                    expression.args = expressionArgs;
                    AST.body.push(expression);
                    break;
                }
                case call_expressions_consts_1.PEN: {
                    var expression = new PenExpression();
                    var _b = findArguments(tokens, call_expressions_consts_1.PEN, 1, ["number"]), newTokens = _b.newTokens, expressionArgs = _b.expressionArgs;
                    tokens = newTokens;
                    expression.args = expressionArgs;
                    AST.body.push(expression);
                    break;
                }
                case call_expressions_consts_1.LINE: {
                    var expression = new LineExpression();
                    var _c = findArguments(tokens, call_expressions_consts_1.LINE, 4, [
                        "number",
                        "number",
                        "number",
                        "number"
                    ]), newTokens = _c.newTokens, expressionArgs = _c.expressionArgs;
                    tokens = newTokens;
                    expression.args = expressionArgs;
                    AST.body.push(expression);
                    break;
                }
            }
        }
    }
    return AST;
}
exports.default = parser;
