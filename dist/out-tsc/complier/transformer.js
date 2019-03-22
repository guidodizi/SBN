import { PAPER, PEN, LINE } from "../consts/call.consts";
var HeadSVG = /** @class */ (function () {
    function HeadSVG(_attr, _body) {
        var _this = this;
        this._attr = _attr;
        this._body = _body;
        this.tag = "svg";
        this.attr = {
            width: 100,
            height: 100,
            viewBox: "0 0 100 100",
            xmlns: "http://www.w3.org/2000/svg",
            version: "1.1"
        };
        // modify preset attributes to given
        Object.keys(_attr).map(function (key) {
            _this.attr[key] = _attr[key];
        });
        this.body = _body;
    }
    return HeadSVG;
}());
export { HeadSVG };
var RectSVG = /** @class */ (function () {
    function RectSVG(_attr) {
        var _this = this;
        this._attr = _attr;
        this.tag = "rect";
        this.attr = {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            fill: "rgb(100%,100%,100%)"
        };
        // modify preset attributes to given
        Object.keys(_attr).map(function (key) {
            _this.attr[key] = _attr[key];
        });
    }
    return RectSVG;
}());
export { RectSVG };
var LineSVG = /** @class */ (function () {
    function LineSVG(_attr) {
        var _this = this;
        this._attr = _attr;
        this.tag = "line";
        this.attr = {};
        // modify preset attributes to given
        Object.keys(_attr).map(function (key) {
            _this.attr[key] = _attr[key];
        });
    }
    return LineSVG;
}());
export { LineSVG };
export default function transformer(ast) {
    var headSVG = new HeadSVG();
    var penColor = 100; // default pen color
    // Extract a call expression at a time as `node`. Loop until we are out of expressions on body
    while (ast.body.length > 0) {
        var node = ast.body.shift();
        switch (node.name) {
            case PAPER: {
                var paperColor = node.arguments[0].value;
                headSVG.body.push(new RectSVG({
                    fill: "rgb(" + paperColor + "%," + paperColor + "%," + paperColor + "%)"
                }));
                break;
            }
            case PEN: {
                penColor = node.arguments[0].value;
                break;
            }
            case LINE: {
                var x1 = node.arguments[0].value;
                var y1 = node.arguments[1].value;
                var x2 = node.arguments[2].value;
                var y2 = node.arguments[3].value;
                headSVG.body.push(new LineSVG({
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    stroke: "rgb(" + penColor + "%," + penColor + "%," + penColor + "%)",
                    "stroke-linecap": "round"
                }));
            }
        }
    }
    return headSVG;
}
//# sourceMappingURL=transformer.js.map