export interface Lexer {
  type: string;
  value?: any;
}
export class LexerWord implements Lexer {
  readonly type = "word";
  value: string;
  constructor(value: string) {
    this.value = value;
  }
}
export class LexerNumber implements Lexer {
  readonly type = "number";
  value: number;
  constructor(value: number) {
    this.value = value;
  }
}
export class LexerNewLine implements Lexer {
  readonly type = "newline";
}

export default function lexer(code: string): Lexer[] {
  const tokens = code
    .replace(/[\n\r]/g, " *nl* ")
    .split(/\s+/)
    .filter((token: string) => token.length > 0);
  if (tokens.length < 1) throw "No tokens found. Try 'Paper 10'";
  return tokens.map((token: string) => {
    // string
    if (isNaN(+token)) {
      if (token === "*nl*") return new LexerNewLine();
      else return new LexerWord(token);
    }
    //number
    else return new LexerNumber(+token);
  });
}
