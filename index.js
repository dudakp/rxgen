#!/usr/bin/env node

const readline = require('readline');
const { VariableDeclarator } = require('estraverse');

const {
  createAST,
  getNodesFromAST,
  filterNewActions,
  convertNodesToConstantNames
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

let newSyncActionTypes = [];
let allActionTypes = [];
let finalSyncActionTypes = [];
let ast;

rl.question('Type (comma separated) sync Redux actions ', answer => {
  newSyncActionTypes = answer.split(',');
  finalSyncActionTypes = newSyncActionTypes;
  console.debug(`Your new actions are: ${newSyncActionTypes}`);

  ast = createAST('./actionTypes.js');

  const nodesFromAST = getNodesFromAST(ast, 'VariableDeclarator');
  allActionTypes = convertNodesToConstantNames(nodesFromAST);

  if (ast) {
    finalSyncActionTypes = filterNewActions(newSyncActionTypes, allActionTypes);
  }

  console.debug('to append: ', finalSyncActionTypes);

  setupActions(finalSyncActionTypes);
  generateActionTypes();
  generateSyncActionCreators();
  //generateReducer();
  rl.close();
});
