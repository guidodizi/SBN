"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LexerWord = /** @class */ (function () {
    function LexerWord(value) {
        this.type = "word";
        this.value = value;
    }
    return LexerWord;
}());
exports.LexerWord = LexerWord;
var LexerNumber = /** @class */ (function () {
    function LexerNumber(value) {
        this.type = "number";
        this.value = value;
    }
    return LexerNumber;
}());
exports.LexerNumber = LexerNumber;
var LexerNewLine = /** @class */ (function () {
    function LexerNewLine() {
        this.type = "newline";
    }
    return LexerNewLine;
}());
exports.LexerNewLine = LexerNewLine;
function lexer(code) {
    var tokens = code
        .replace(/[\n\r]/g, " *nl* ")
        .split(/\s+/)
        .filter(function (token) { return token.length > 0; });
    if (tokens.length < 1)
        throw "No tokens found. Try 'Paper 10'";
    return tokens.map(function (token) {
        // string
        if (isNaN(+token)) {
            if (token === "*nl*")
                return new LexerNewLine();
            else
                return new LexerWord(token);
        }
        //number
        else
            return new LexerNumber(+token);
    });
}
exports.default = lexer;
