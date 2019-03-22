export interface Lexer {
  type: string;
  value: any;
}
export class LexerWord implements Lexer {
  readonly type = "word";
  value: string;
  constructor(private _value: string) {
    this.value = _value;
  }
}
export class LexerNumber implements Lexer {
  readonly type = "number";
  value: number;
  constructor(_value: number) {
    this.value = _value;
  }
}

export default function lexer(code: string): Lexer[] {
  return code
    .split(/\s+/)
    .filter((token: string) => token.length > 0)
    .map((token: string) => (isNaN(+token) ? new LexerWord(token) : new LexerNumber(+token)));
}
