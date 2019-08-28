const fs = require("fs");
const recast = require('recast');

let ast;

module.exports = {

  createAST: (file) => {
    const toRead = fs.readFileSync(file).toString();
    if (!toRead) return;
    ast = Parser.parse(toRead);
    console.log(ast);
  },

  traverseAST: () => {

  }

};
