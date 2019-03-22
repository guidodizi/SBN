import lexer from "./lexer";
import parser from "./parser";
import transformer from "./transformer";
import generator from "./generator";
var SBN = /** @class */ (function () {
    function SBN() {
        this.lexer = lexer;
        this.parser = parser;
        this.transformer = transformer;
        this.generator = generator;
    }
    SBN.prototype.complie = function (code) {
        return this.generator(this.transformer(this.parser(this.lexer(code))));
    };
    return SBN;
}());
export default SBN;
;
//# sourceMappingURL=index.js.map