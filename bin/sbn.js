#! /usr/bin/env node
const shell = require("shelljs");
shell.exec(`node ${__dirname}/../build/app.js ${process.argv[2]}`);
