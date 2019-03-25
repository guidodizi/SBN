import SBN from "./complier/index";
import express = require("express");

const code = `
Paper 100 
Pen 0
Line 0 0 100 100
Line 100 0 0 100
`;
const sbn = new SBN();

// Create a new express application instance
const app: express.Application = express();

app.get("/", function(req, res) {
  res.send(sbn.complie(code));
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
