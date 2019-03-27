#! /usr/bin/env node
const shell = require("shelljs");
const args = process.argv.slice(2);
shell.exec(`node ${__dirname}/../build/app.js ${args.join(" ")}`);
