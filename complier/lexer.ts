export interface Lexer {
  type: string;
  lineCount: number;
  value?: any;
}
export class LexerWord implements Lexer {
  readonly type = "word";
  constructor(public value: string, public lineCount: number) {}
}
export class LexerNumber implements Lexer {
  readonly type = "number";
  constructor(public value: number, public lineCount: number) {
    if (value > 100 || value < 0) {
      throw `[Line ${lineCount}]: Number values must be between 0-100`;
    }
  }
}
export class LexerNewLine implements Lexer {
  readonly type = "newline";
  constructor(public lineCount: number) {}
}

export default function lexer(code: string): Lexer[] {
  let lineCount = 1;

  const tokens = code
    .replace(/[\n]/g, " *nl* ")
    .split(/\s+/)
    .filter((token: string) => token.length > 0);
  if (tokens.length < 1) throw "No tokens found. Try 'Paper 10'";
  return tokens.map((token: string) => {
    // string
    if (isNaN(+token)) {
      if (token === "*nl*") {
        lineCount += 1;
        return new LexerNewLine(lineCount);
      } else return new LexerWord(token, lineCount);
    }
    //number
    else return new LexerNumber(+token, lineCount);
  });
}
