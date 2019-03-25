import { Lexer, LexerWord, LexerNumber } from "./lexer";
import { PAPER, PEN, LINE } from "../consts/call-expressions.consts";

export interface Expression {
  type: string;
  name?: string;
  value?: string | number;
  arguments?: Expression[];
  body?: Expression[];
}
export class ASTExpression {
  readonly type = "Drawing";
  body: Expression[] = [];
  constructor(private _body: Expression[] = []) {
    this.body = _body;
  }
}

export class NumberExpression implements Expression {
  readonly type = "NumberLiteral";
  value: number;
  constructor(private _value: number) {
    this.value = _value;
  }
}

export class CallExpression implements Expression {
  readonly type = "CallExpression";
  readonly name: string;
  constructor(private _name: string) {
    this.name = _name;
  }
}

export class PaperExpression extends CallExpression {
  arguments: NumberExpression[];
  constructor(private _arguments: NumberExpression[] = []) {
    super(PAPER);
    this.arguments = _arguments;
  }
}
export class PenExpression extends CallExpression {
  arguments: NumberExpression[];
  constructor(private _arguments: NumberExpression[] = []) {
    super(PEN);
    this.arguments = _arguments;
  }
}
export class LineExpression extends CallExpression {
  arguments: NumberExpression[];
  constructor(private _arguments: NumberExpression[] = []) {
    super(LINE);
    this.arguments = _arguments;
  }
}

export default function parser(tokens: Lexer[]) {
  const AST = new ASTExpression();

  // extract a token at a time as currentToken. Loop until we are out of tokens
  while (tokens.length > 0) {
    const currentToken = tokens.shift();

    // Since number tokens do nothing by itself, we only analyse syntax when we find LexerWord
    if (currentToken instanceof LexerWord) {
      switch (currentToken.value) {
        case PAPER: {
          const expression = new PaperExpression();

          // if current token is CallExpression of type Paper, next token should be color argument
          const argument = tokens.shift();
          if (argument instanceof LexerNumber) {
            expression.arguments.push(new NumberExpression(argument.value));

            AST.body.push(expression);
          } else {
            throw "Paper command must be followed by a number";
          }

          break;
        }

        case PEN: {
          const expression = new PenExpression();

          // if current token is CallExpression of type Paper, next token should be color argument
          const argument = tokens.shift();
          if (argument instanceof LexerNumber) {
            expression.arguments.push(new NumberExpression(argument.value));

            AST.body.push(expression);
          } else {
            throw "Pen command must be followed by a number";
          }

          break;
        }
        case LINE: {
          const expression = new LineExpression();
          // if current token is CallExpression of type Paper, next token should be color argument
          const args = tokens.splice(0, 4);
          if (args.every((arg: Lexer) => arg instanceof LexerNumber)) {
            args.map((arg: Lexer) => {
              expression.arguments.push(new NumberExpression((<LexerNumber>arg).value));
            });

            AST.body.push(expression);
          } else {
            throw "Line command must be followed by a four number arguments";
          }

          break;
        }
      }
    }
  }

  return AST;
}
