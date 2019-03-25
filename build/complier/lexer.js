"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LexerWord = /** @class */ (function () {
    function LexerWord(_value) {
        this._value = _value;
        this.type = "word";
        this.value = _value;
    }
    return LexerWord;
}());
exports.LexerWord = LexerWord;
var LexerNumber = /** @class */ (function () {
    function LexerNumber(_value) {
        this._value = _value;
        this.type = "number";
        this.value = _value;
    }
    return LexerNumber;
}());
exports.LexerNumber = LexerNumber;
function lexer(code) {
    return code
        .split(/\s+/)
        .filter(function (token) { return token.length > 0; })
        .map(function (token) { return (isNaN(+token) ? new LexerWord(token) : new LexerNumber(+token)); });
}
exports.default = lexer;
