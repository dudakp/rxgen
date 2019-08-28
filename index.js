#!/usr/bin/env node

const fs = require("fs");
const readline = require("readline");
const esprima = require("esprima");
const estraverse = require("estraverse");

const { createAST } = require("./src/analysisUtils");
const { saveToFile } = require("./src/fileUtils");
const {
  generateReducer,
  generateSyncActionCreators,
  generateActionTypes,
  setupActions
} = require("./src/generators");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let newSyncActionTypes = [];
let allActionTypes = [];

let finalSyncActionTypes = [];

rl.question("Type (comma separated) sync Redux actions ", answer => {
  newSyncActionTypes = answer.split(",").map(a => a.toUpperCase());
  console.log(`Your new actions are: ${newSyncActionTypes}`);

  let toRead = fs.readFileSync("./actionTypes.js").toString();
  const ast = esprima.parseModule(toRead);
  estraverse.traverse(ast, {
    enter: function(node, parent) {
      if (
        node.type == "FunctionExpression" ||
        node.type == "FunctionDeclaration"
      )
        return estraverse.VisitorOption.Skip;
    },
    leave: function(node, parent) {
      if (node.type == "VariableDeclarator") {
        allActionTypes.push(node.id.name);
        console.log("all action types: ", allActionTypes);
      }
    }
  });
  finalSyncActionTypes = newSyncActionTypes.filter(
    x => !allActionTypes.includes(x)
  );
  console.log("to append: ", finalSyncActionTypes);

  setupActions(finalSyncActionTypes);
  generateActionTypes();
  generateSyncActionCreators();
  generateReducer();
  rl.close();
});
