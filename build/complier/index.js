"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lexer_1 = __importDefault(require("./lexer"));
var parser_1 = __importDefault(require("./parser"));
var transformer_1 = __importDefault(require("./transformer"));
var generator_1 = __importDefault(require("./generator"));
var SBN = /** @class */ (function () {
    function SBN() {
        this.lexer = lexer_1.default;
        this.parser = parser_1.default;
        this.transformer = transformer_1.default;
        this.generator = generator_1.default;
    }
    SBN.prototype.complie = function (code) {
        return this.generator(this.transformer(this.parser(this.lexer(code))));
    };
    return SBN;
}());
exports.default = SBN;
;
