"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LexerWord = /** @class */ (function () {
    function LexerWord(value, lineCount) {
        this.value = value;
        this.lineCount = lineCount;
        this.type = "word";
    }
    return LexerWord;
}());
exports.LexerWord = LexerWord;
var LexerNumber = /** @class */ (function () {
    function LexerNumber(value, lineCount) {
        this.value = value;
        this.lineCount = lineCount;
        this.type = "number";
        if (value > 100 || value < 0) {
            throw "[Line " + lineCount + "]: Number values must be between 0-100";
        }
    }
    return LexerNumber;
}());
exports.LexerNumber = LexerNumber;
var LexerNewLine = /** @class */ (function () {
    function LexerNewLine(lineCount) {
        this.lineCount = lineCount;
        this.type = "newline";
    }
    return LexerNewLine;
}());
exports.LexerNewLine = LexerNewLine;
function lexer(code) {
    var lineCount = 1;
    var tokens = code
        .replace(/[\n]/g, " *nl* ")
        .split(/\s+/)
        .filter(function (token) { return token.length > 0; });
    if (tokens.length < 1)
        throw "No tokens found. Try 'Paper 10'";
    return tokens.map(function (token) {
        // string
        if (isNaN(+token)) {
            if (token === "*nl*") {
                lineCount += 1;
                return new LexerNewLine(lineCount);
            }
            else
                return new LexerWord(token, lineCount);
        }
        //number
        else
            return new LexerNumber(+token, lineCount);
    });
}
exports.default = lexer;
