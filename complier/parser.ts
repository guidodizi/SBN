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
  constructor(public body: Expression[] = []) {}
}

export class NumberExpression implements Expression {
  readonly type = "NumberLiteral";
  constructor(public value: number) {}
}

export class CommentExpression implements Expression {
  readonly type = "CommentExpression";
  constructor(public value: string = "") {}
}

export class CallExpression implements Expression {
  readonly type = "CallExpression";
  constructor(public readonly name: string) {}
}

export class PaperExpression extends CallExpression {
  constructor(public args: NumberExpression[] = []) {
    super(PAPER);
  }
}
export class PenExpression extends CallExpression {
  constructor(public args: NumberExpression[] = []) {
    super(PEN);
  }
}
export class LineExpression extends CallExpression {
  constructor(public args: NumberExpression[] = []) {
    super(LINE);
  }
}

function findArguments(
  lineCount: number,
  tokens: Lexer[],
  command: string,
  cantArgs: number,
  expectedTypes: ("word" | "number")[]
): { newTokens: Lexer[]; expressionArgs: Expression[] } {
  // get arguments
  const args = tokens.splice(0, cantArgs).filter((t: Lexer) => t.type !== "newline");

  // found less arguments than expected
  if (args.length !== cantArgs)
    throw `[Line ${lineCount}]: ${command} expected ${cantArgs} arguments, but found only ${
      args.length
    }`;

  // type check arguments with lexer values
  let positionArgument = 0;
  const argsTypeCheck = args.some((arg: Lexer, index: number) => {
    if (arg.type !== expectedTypes[index]) {
      positionArgument = index;
      return false;
    } else return true;
  });

  // typecheck of arguments failed
  if (!argsTypeCheck)
    throw `[Line ${lineCount}]: ${command} expected on parameter ${positionArgument + 1} a ${
      expectedTypes[positionArgument]
    }. Found a ${args[positionArgument].type}`;

  return {
    newTokens: [...tokens],
    expressionArgs: <Expression[]>args.map((arg: Lexer) => {
      if (arg instanceof LexerNumber) {
        return new NumberExpression(arg.value);
      } else if (arg instanceof LexerWord) {
        throw `[Line ${lineCount}]: Not implemented yet`;
      }
    })
  };
}

function checkLineEnd(token: Lexer | undefined, command: string, cantArgs: number) {
  if (token && token.type !== "newline")
    throw `[Line ${token.lineCount}]: ${command} expected amount of arguments: ${cantArgs} `;
}

export default function parser(tokens: Lexer[]) {
  const AST = new ASTExpression();

  let paper = false;
  let pen = false;

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
          if (paper) {
            throw `[Line ${currentToken.lineCount}]: ${PAPER} was already defined`;
          }
          paper = true;

          const expression = new PaperExpression();
          const command = PAPER;
          const cantArgs = 1;
          const expectedTypes: ("word" | "number")[] = ["number"];

          const { newTokens, expressionArgs } = findArguments(
            currentToken.lineCount,
            tokens,
            command,
            cantArgs,
            expectedTypes
          );
          tokens = newTokens;
          expression.args = <NumberExpression[]>expressionArgs;

          checkLineEnd(tokens.shift(), command, cantArgs);
          AST.body.push(expression);
          break;
        }

        case PEN: {
          if (!paper) {
            throw `[Line ${
              currentToken.lineCount
            }]: First command must always be a ${PAPER} command`;
          }
          if (pen) {
            throw `[Line ${currentToken.lineCount}]: ${PEN} was already defined`;
          }
          pen = true;
          const expression = new PenExpression();
          const command = PEN;
          const cantArgs = 1;
          const expectedTypes: ("word" | "number")[] = ["number"];

          const { newTokens, expressionArgs } = findArguments(
            currentToken.lineCount,
            tokens,
            command,
            cantArgs,
            expectedTypes
          );
          tokens = newTokens;
          expression.args = <NumberExpression[]>expressionArgs;

          checkLineEnd(tokens.shift(), command, cantArgs);
          AST.body.push(expression);
          break;
        }
        case LINE: {
          if (!paper) {
            throw `[Line ${
              currentToken.lineCount
            }]: First command must always be a ${PAPER} command`;
          }
          const expression = new LineExpression();
          const command = LINE;
          const cantArgs = 4;
          const expectedTypes: ("word" | "number")[] = ["number", "number", "number", "number"];

          const { newTokens, expressionArgs } = findArguments(
            currentToken.lineCount,
            tokens,
            command,
            cantArgs,
            expectedTypes
          );
          tokens = newTokens;
          expression.args = <NumberExpression[]>expressionArgs;

          checkLineEnd(tokens.shift(), command, cantArgs);
          AST.body.push(expression);
          break;
        }
      }
    }
  }

  return AST;
}
