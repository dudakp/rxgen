#!/usr/bin/env node

const readline = require('readline');
const {_} = require('lodash');

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
    newActionTypes = answer.split(',').map(action => _.snakeCase(action).toUpperCase());
    allActionTypes = newActionTypes;

    ast = createAST('./actionTypes.js');
    const nodesFromAST = getNodesFromAST(ast, 'VariableDeclarator');
    allActionTypes = convertNodesToConstantNames(nodesFromAST);
    newActionTypes = filterNewActions(newActionTypes, allActionTypes);

    setupActions(newActionTypes);
    generateActionTypes();
    rl.close();
  });
} else if (args.includes('g-creators')) {
  ast = createAST('./actionTypes.js');

  const nodesFromAST = getNodesFromAST(ast, 'VariableDeclarator');
  allActionTypes = convertNodesToConstantNames(nodesFromAST);

  setupActions(allActionTypes);
  generateSyncActionCreators();
  process.exit();
} else if (args.includes('g-reducer')) {
  ast = createAST('./actionTypes.js');

  const nodesFromAST = getNodesFromAST(ast, 'VariableDeclarator');
  allActionTypes = convertNodesToConstantNames(nodesFromAST);

  setupActions(allActionTypes);
  generateReducer();
  process.exit();
}
