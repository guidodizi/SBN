import {
  ASTExpression,
  Expression,
  CallExpression,
  PaperExpression,
  PenExpression,
  LineExpression
} from "./parser";
import { PAPER, PEN, LINE } from "../consts/call-expressions.consts";

const MAGNIFIER = 5;
export interface SVG {
  tag: string;
  attr: { [x: string]: any };
  body?: SVG[];
}
export class HeadSVG implements SVG {
  readonly tag = "svg";
  attr: { [x: string]: any } = {
    width: 100 * MAGNIFIER,
    height: 100 * MAGNIFIER,
    viewBox: `0 0 ${100 * MAGNIFIER} ${100 * MAGNIFIER}`,
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1"
  };
  body: SVG[];
  constructor(attr: { [x: string]: any } = [], body: SVG[] = []) {
    // modify preset attributes to given
    Object.keys(attr).map(key => {
      this.attr[key] = attr[key];
    });
    this.body = body;
  }
}
export class RectSVG implements SVG {
  readonly tag = "rect";
  attr: { [x: string]: any } = {
    x: 0,
    y: 0,
    width: 100 * MAGNIFIER,
    height: 100 * MAGNIFIER,
    fill: "rgb(100%,100%,100%)"
  };
  constructor(attr: { [x: string]: any } = []) {
    // modify preset attributes to given
    Object.keys(attr).map(key => {
      this.attr[key] = attr[key];
    });
  }
}
export class LineSVG implements SVG {
  readonly tag = "line";
  attr: { [x: string]: any } = {};
  constructor(attr: { [x: string]: any } = []) {
    // modify preset attributes to given
    Object.keys(attr).map(key => {
      this.attr[key] = attr[key];
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
          const paperColor = (<PaperExpression>node).args[0].value;
          headSVG.body.push(
            new RectSVG({
              fill: "rgb(" + paperColor + "%," + paperColor + "%," + paperColor + "%)"
            })
          );

          break;
        }
        case PEN: {
          penColor = (<PenExpression>node).args[0].value;
          break;
        }
        case LINE: {
          const lineNode = <LineExpression>node;
          const x1 = lineNode.args[0].value;
          const y1 = lineNode.args[1].value;
          const x2 = lineNode.args[2].value;
          const y2 = lineNode.args[3].value;
          headSVG.body.push(
            new LineSVG({
              x1: x1 * MAGNIFIER,
              y1: y1 * MAGNIFIER,
              x2: x2 * MAGNIFIER,
              y2: y2 * MAGNIFIER,
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
