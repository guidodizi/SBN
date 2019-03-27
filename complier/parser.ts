import { Lexer, LexerWord, LexerNumber } from "./lexer";
import { PAPER, PEN, LINE, COMMENT } from "../consts/call-expressions.consts";

export interface Expression {
  type: string;
  name?: string;
  value?: string | number;
  args?: Expression[];
  body?: Expression[];
}
export class ASTExpression {
  readonly type = "Drawing";
  body: Expression[] = [];
  constructor(body: Expression[] = []) {
    this.body = body;
  }
}

export class NumberExpression implements Expression {
  readonly type = "NumberLiteral";
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}

export class CommentExpression implements Expression {
  readonly type = "CommentExpression";
  value: string;
  constructor(value: string = "") {
    this.value = value;
  }
}

export class CallExpression implements Expression {
  readonly type = "CallExpression";
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export class PaperExpression extends CallExpression {
  args: NumberExpression[];
  constructor(args: NumberExpression[] = []) {
    super(PAPER);
    this.args = args;
  }
}
export class PenExpression extends CallExpression {
  args: NumberExpression[];
  constructor(args: NumberExpression[] = []) {
    super(PEN);
    this.args = args;
  }
}
export class LineExpression extends CallExpression {
  args: NumberExpression[];
  constructor(args: NumberExpression[] = []) {
    super(LINE);
    this.args = args;
  }
}

function findArguments(
  tokens: Lexer[],
  command: string,
  cantArgs: number,
  expectedTypes: ("word" | "number")[]
): { newTokens: Lexer[]; expressionArgs: Expression[] } {
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
    expressionArgs: <Expression[]>args.map((arg: Lexer) => {
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

          const { newTokens, expressionArgs } = findArguments(tokens, PAPER, 1, ["number"]);
          tokens = newTokens;
          expression.args = <NumberExpression[]>expressionArgs;
          AST.body.push(expression);
          break;
        }

        case PEN: {
          const expression = new PenExpression();

          const { newTokens, expressionArgs } = findArguments(tokens, PEN, 1, ["number"]);
          tokens = newTokens;
          expression.args = <NumberExpression[]>expressionArgs;
          AST.body.push(expression);

          break;
        }
        case LINE: {
          const expression = new LineExpression();

          const { newTokens, expressionArgs } = findArguments(tokens, LINE, 4, [
            "number",
            "number",
            "number",
            "number"
          ]);
          tokens = newTokens;
          expression.args = <NumberExpression[]>expressionArgs;
          AST.body.push(expression);

          break;
        }
      }
    }
  }

  return AST;
}
