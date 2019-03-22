import { Lexer, LexerWord, LexerNumber } from "./lexer";
import { PAPER, PEN, LINE } from "../consts/call.consts";

export interface Expression {
  type: string;
  name?: string;
  value?: any;
  arguments?: any[];
}
export class ASTExpression implements Expression {
  readonly type = "Drawing";
  body: Expression[] = [];
  constructor(private _body?: Expression[]) {
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

export class PaperExpression implements Expression {
  readonly type = "CallExpression";
  readonly name = PAPER;
  arguments: NumberExpression[] = [];
  constructor(private args?: NumberExpression[]) {
    this.arguments = args;
  }
}
export class PenExpression implements Expression {
  readonly type = "CallExpression";
  readonly name = PEN;
  arguments: NumberExpression[] = [];
  constructor(private args?: NumberExpression[]) {
    this.arguments = args;
  }
}
export class LineExpression implements Expression {
  readonly type = "CallExpression";
  readonly name = LINE;
  arguments: NumberExpression[] = [];
  constructor(private args?: NumberExpression[]) {
    this.arguments = args;
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
        }
        case LINE: {
          const expression = new LineExpression();
          // if current token is CallExpression of type Paper, next token should be color argument
          const args = tokens.splice(0, 4);
          if (args.every((arg: Lexer) => arg instanceof LexerNumber)) {
            args.map((arg: LexerNumber) => {
              expression.arguments.push(new NumberExpression(arg.value));
            });

            AST.body.push(expression);
          } else {
            throw "Line command must be followed by a four number arguments";
          }
        }
      }
    }
  }

  return AST;
}
