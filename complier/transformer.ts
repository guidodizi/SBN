import {
  ASTExpression,
  Expression,
  CallExpression,
  PaperExpression,
  PenExpression,
  LineExpression
} from "./parser";
import { PAPER, PEN, LINE } from "../consts/call-expressions.consts";

export interface SVG {
  tag: string;
  attr: { [x: string]: any };
  body?: SVG[];
}
export class HeadSVG implements SVG {
  readonly tag = "svg";
  attr: { [x: string]: any } = {
    width: 100,
    height: 100,
    viewBox: "0 0 100 100",
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1"
  };
  body: SVG[];
  constructor(private _attr: { [x: string]: any } = [], private _body: SVG[] = []) {
    // modify preset attributes to given
    Object.keys(_attr).map(key => {
      this.attr[key] = _attr[key];
    });
    this.body = _body;
  }
}
export class RectSVG implements SVG {
  readonly tag = "rect";
  attr: { [x: string]: any } = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    fill: "rgb(100%,100%,100%)"
  };
  constructor(private _attr: { [x: string]: any } = []) {
    // modify preset attributes to given
    Object.keys(_attr).map(key => {
      this.attr[key] = _attr[key];
    });
  }
}
export class LineSVG implements SVG {
  readonly tag = "line";
  attr: { [x: string]: any } = {};
  constructor(private _attr: { [x: string]: any } = []) {
    // modify preset attributes to given
    Object.keys(_attr).map(key => {
      this.attr[key] = _attr[key];
    });
  }
}

export default function transformer(ast: ASTExpression) {
  const headSVG = new HeadSVG();

  let penColor = 100; // default pen color

  // Extract a call expression at a time as `node`. Loop until we are out of expressions on body
  while (ast.body.length > 0) {
    const node = <Expression>ast.body.shift();
    if (node instanceof CallExpression) {
      switch (node.name) {
        case PAPER: {
          const paperColor = (<PaperExpression>node).arguments[0].value;
          headSVG.body.push(
            new RectSVG({
              fill: "rgb(" + paperColor + "%," + paperColor + "%," + paperColor + "%)"
            })
          );

          break;
        }
        case PEN: {
          penColor = (<PenExpression>node).arguments[0].value;
          break;
        }
        case LINE: {
          const lineNode = <LineExpression>node;
          const x1 = lineNode.arguments[0].value;
          const y1 = lineNode.arguments[1].value;
          const x2 = lineNode.arguments[2].value;
          const y2 = lineNode.arguments[3].value;
          headSVG.body.push(
            new LineSVG({
              x1,
              y1,
              x2,
              y2,
              stroke: "rgb(" + penColor + "%," + penColor + "%," + penColor + "%)",
              "stroke-linecap": "round"
            })
          );
          break;
        }
      }
    }
  }
  return headSVG;
}
