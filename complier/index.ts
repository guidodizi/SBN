import lexer from "./lexer";
import parser from "./parser";
import transformer from "./transformer";
import generator from "./generator";

export default class SBN {
  readonly lexer = lexer;
  readonly parser = parser;
  readonly transformer = transformer;
  readonly generator = generator;

  complie(code: string) {
    return this.generator(this.transformer(this.parser(this.lexer(code))));
  }
}
