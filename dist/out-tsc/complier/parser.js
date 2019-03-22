import { LexerWord, LexerNumber } from "./lexer";
import { PAPER, PEN, LINE } from "../consts/call.consts";
var ASTExpression = /** @class */ (function () {
    function ASTExpression(_body) {
        this._body = _body;
        this.type = "Drawing";
        this.body = [];
        this.body = _body;
    }
    return ASTExpression;
}());
export { ASTExpression };
var NumberExpression = /** @class */ (function () {
    function NumberExpression(_value) {
        this._value = _value;
        this.type = "NumberLiteral";
        this.value = _value;
    }
    return NumberExpression;
}());
export { NumberExpression };
var PaperExpression = /** @class */ (function () {
    function PaperExpression(args) {
        this.args = args;
        this.type = "CallExpression";
        this.name = PAPER;
        this.arguments = [];
        this.arguments = args;
    }
    return PaperExpression;
}());
export { PaperExpression };
var PenExpression = /** @class */ (function () {
    function PenExpression(args) {
        this.args = args;
        this.type = "CallExpression";
        this.name = PEN;
        this.arguments = [];
        this.arguments = args;
    }
    return PenExpression;
}());
export { PenExpression };
var LineExpression = /** @class */ (function () {
    function LineExpression(args) {
        this.args = args;
        this.type = "CallExpression";
        this.name = LINE;
        this.arguments = [];
        this.arguments = args;
    }
    return LineExpression;
}());
export { LineExpression };
export default function parser(tokens) {
    var AST = new ASTExpression();
    var _loop_1 = function () {
        var currentToken = tokens.shift();
        // Since number tokens do nothing by itself, we only analyse syntax when we find LexerWord
        if (currentToken instanceof LexerWord) {
            switch (currentToken.value) {
                case PAPER: {
                    var expression = new PaperExpression();
                    // if current token is CallExpression of type Paper, next token should be color argument
                    var argument = tokens.shift();
                    if (argument instanceof LexerNumber) {
                        expression.arguments.push(new NumberExpression(argument.value));
                        AST.body.push(expression);
                    }
                    else {
                        throw "Paper command must be followed by a number";
                    }
                    break;
                }
                case PEN: {
                    var expression = new PenExpression();
                    // if current token is CallExpression of type Paper, next token should be color argument
                    var argument = tokens.shift();
                    if (argument instanceof LexerNumber) {
                        expression.arguments.push(new NumberExpression(argument.value));
                        AST.body.push(expression);
                    }
                    else {
                        throw "Pen command must be followed by a number";
                    }
                }
                case LINE: {
                    var expression_1 = new LineExpression();
                    // if current token is CallExpression of type Paper, next token should be color argument
                    var args = tokens.splice(0, 4);
                    if (args.every(function (arg) { return arg instanceof LexerNumber; })) {
                        args.map(function (arg) {
                            expression_1.arguments.push(new NumberExpression(arg.value));
                        });
                        AST.body.push(expression_1);
                    }
                    else {
                        throw "Line command must be followed by a four number arguments";
                    }
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
//# sourceMappingURL=parser.js.map