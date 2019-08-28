#!/usr/bin/env node

const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let syncActions = [];
let actionTypes = [];

rl.question("Type (comma separated) sync Redux actions ", answer => {
  syncActions = answer.split(",");
  console.log(`Your actions are: ${syncActions}`);
  generateActionTypes(syncActions);
  generateSyncActionCreators(syncActions);
  rl.close();
});

function saveToFile(filename, ...templates) {
  fs.writeFile(filename, templates.join(""), err => {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
}

const toCamel = s => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1
      .toUpperCase()
      .replace("-", "")
      .replace("_", "");
  });
};

function toSnake(str) {
  if (!str) return "";

  return String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "")
    .replace(/([a-z])([A-Z])/g, (m, a, b) => a + "_" + b.toLowerCase())
    .replace(/[^A-Za-z0-9]+|_+/g, "_")
    .toUpperCase();
}

const generateActionTypes = syncActions => {
  actionTypes = syncActions.map(
    action => `export const ${toSnake(action)} = "${toSnake(action)}";\n`
  );
  saveToFile("./actionTypes.js", actionTypes.join(""));
};

const generateSyncActionCreators = syncActions => {
  const imports = `import {
    ${syncActions.map(action =>
      action.toUpperCase()
    )}\n} from "./actionTypes";\n\n`;

  const actionCreators = syncActions.map(
    action =>
      `export const ${toCamel(action)} = payload => ({
  type: ${action.toUpperCase()},
  payload
});\n`
  );
  saveToFile("./actionCreators.js", imports, actionCreators.join(""));
};
