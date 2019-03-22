import { SVG, HeadSVG } from "./transformer";

export default function generator(svg_ast: HeadSVG) {
  // create attributes string out of attr object
  // { "width": 100, "height": 100 } becomes 'width="100" height="100"'

  function createAttrString(node: SVG) {
    return Object.keys(node.attr)
      .map(key => key + `="` + node.attr[key] + `"`)
      .join(" ");
  }

  //top node is always <svg>. Create attributes string for svg tag
  const svg_attr = createAttrString(svg_ast);

  //for each element in the body of svg_ast, generate a svg tag
  const tags = svg_ast.body
    .map((node: SVG) => "<" + node.tag + " " + createAttrString(node) + "></" + node.tag + ">")
    .join("\n\t");

  //wrap with open and close svg tag to complete SVG code
  return "<svg " + svg_attr + ">\n" + tags + "\n</svg>";
}
