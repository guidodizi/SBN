import lexer from "./lexer";
import parser from "./parser";
import transformer from "./transformer";
import generator from "./generator";

export default class SBN {
  lexer = lexer;
  parser = parser;
  transformer = transformer;
  generator = generator;

  complie(code: string) {
    return this.generator(this.transformer(this.parser(this.lexer(code))));
  }
};

