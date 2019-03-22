var LexerWord = /** @class */ (function () {
    function LexerWord(_value) {
        this._value = _value;
        this.type = "word";
        this.value = _value;
    }
    return LexerWord;
}());
export { LexerWord };
var LexerNumber = /** @class */ (function () {
    function LexerNumber(_value) {
        this.type = "number";
        this.value = _value;
    }
    return LexerNumber;
}());
export { LexerNumber };
export default function lexer(code) {
    return code
        .split(/\s+/)
        .filter(function (token) { return token.length > 0; })
        .map(function (token) { return (isNaN(+token) ? new LexerWord(token) : new LexerNumber(+token)); });
}
//# sourceMappingURL=lexer.js.map