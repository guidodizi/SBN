"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generator(svg_ast) {
    // create attributes string out of attr object
    // { "width": 100, "height": 100 } becomes 'width="100" height="100"'
    function createAttrString(node) {
        return Object.keys(node.attr)
            .map(function (key) { return key + "=\"" + node.attr[key] + "\""; })
            .join(" ");
    }
    //top node is always <svg>. Create attributes string for svg tag
    var svg_attr = createAttrString(svg_ast);
    //for each element in the body of svg_ast, generate a svg tag
    var tags = svg_ast.body
        .map(function (node) { return "<" + node.tag + " " + createAttrString(node) + "></" + node.tag + ">"; })
        .join("\n\t");
    //wrap with open and close svg tag to complete SVG code
    return "<svg " + svg_attr + ">\n" + tags + "\n</svg>";
}
exports.default = generator;
