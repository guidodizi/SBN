import { Lexer, LexerWord, LexerNumber } from "./lexer";
import { PAPER, PEN, LINE, COMMENT } from "../consts/call-expressions.consts";

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

export class CommentExpression implements Expression {
  readonly type = "CommentExpression";
  value: string;
  constructor(private _value: string = "") {
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

function findArguments(
  tokens: Lexer[],
  command: string,
  cantArgs: number,
  expectedTypes: ("word" | "number")[]
): { newTokens: Lexer[]; expressionArguments: Expression[] } {
  // get arguments
  const args = tokens.splice(0, cantArgs);

  // found less arguments than expected
  if (args.length !== cantArgs)
    throw `${command} expected ${cantArgs} arguments, but found only ${args.length}`;

  // type check arguments
  let positionArgument = 0;
  const argsTypeCheck = args.some((arg: Lexer, index: number) => {
    if (arg.type !== expectedTypes[index]) {
      positionArgument = index;
      return false;
    } else return true;
  });

  // typecheck of arguments failed
  if (!argsTypeCheck)
    throw `${command} takes on parameter ${positionArgument + 1} a ${
      expectedTypes[positionArgument]
    }. Found an argument of type ${args[positionArgument].type}`;

  return {
    newTokens: [...tokens],
    expressionArguments: <Expression[]>args.map((arg: Lexer) => {
      if (arg instanceof LexerNumber) {
        return new NumberExpression(arg.value);
      } else if (arg instanceof LexerWord) {
        throw "Not implemented yet";
      }
    })
  };
}

export default function parser(tokens: Lexer[]) {
  const AST = new ASTExpression();

  // extract a token at a time as currentToken. Loop until we are out of tokens
  while (tokens.length > 0) {
    const currentToken = tokens.shift();

    // Since number tokens do nothing by itself, we only analyse syntax when we find LexerWord
    if (currentToken instanceof LexerWord) {
      switch (currentToken.value) {
        case COMMENT: {
          const expression = new CommentExpression();
          let next = <Lexer>tokens.shift();
          while (next.type !== "newline") {
            expression.value += next.value + " ";
            next = <Lexer>tokens.shift();
          }
          AST.body.push(expression);
          break;
        }
        case PAPER: {
          const expression = new PaperExpression();

          const { newTokens, expressionArguments } = findArguments(tokens, PAPER, 1, ["number"]);
          tokens = newTokens;
          expression.arguments = <NumberExpression[]>expressionArguments;
          AST.body.push(expression);
          break;
        }

        case PEN: {
          const expression = new PenExpression();

          const { newTokens, expressionArguments } = findArguments(tokens, PEN, 1, ["number"]);
          tokens = newTokens;
          expression.arguments = <NumberExpression[]>expressionArguments;
          AST.body.push(expression);

          break;
        }
        case LINE: {
          const expression = new LineExpression();

          const { newTokens, expressionArguments } = findArguments(tokens, LINE, 4, [
            "number",
            "number",
            "number",
            "number"
          ]);
          tokens = newTokens;
          expression.arguments = <NumberExpression[]>expressionArguments;
          AST.body.push(expression);

          break;
        }
      }
    }
  }

  return AST;
}
