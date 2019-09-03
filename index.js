#!/usr/bin/env node

const readline = require('readline');
const { _ } = require('lodash');

const {
  createAST,
  getNodesFromAST,
  convertNodesToConstantNames,
  filterNewActions
} = require('./src/analysisUtils');
const {
  generateReducer,
  generateSyncActionCreators,
  generateActionTypes,
  setupActions
} = require('./src/generators');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let allActionTypes = [];
let newActionTypes = [];
let ast;

const args = process.argv.slice(2);

if (args.length === 0) {
  rl.question('Type (comma separated) sync Redux actions ', answer => {
    newActionTypes = answer
      .split(',')
      .map(action => _.snakeCase(action).toUpperCase());
    allActionTypes = newActionTypes;
    console.debug(`New action types are: ${newActionTypes}`);
    ast = createAST('./actionTypes.js');
    if (ast) {
      const nodesFromAST = getNodesFromAST(ast, 'VariableDeclarator');
      allActionTypes = convertNodesToConstantNames(nodesFromAST);
      newActionTypes = filterNewActions(newActionTypes, allActionTypes);
    }

    console.debug(`Generating action types file...`);
    setupActions(newActionTypes);
    generateActionTypes();
    rl.close();
  });
} else if (args.length === 1) {
  ast = createAST('./actionTypes.js');

  const nodesFromAST = getNodesFromAST(ast, 'VariableDeclarator');
  allActionTypes = convertNodesToConstantNames(nodesFromAST);

  setupActions(allActionTypes);
  if (args.includes('g-creators')) {
    console.debug(`Generating action creators file...`);
    generateSyncActionCreators();
  } else if (args.includes('g-reducer')) {
    console.debug(`Generating reducer file...`);
    generateReducer();
  }
  process.exit();
} else {
  process.exit();
}
