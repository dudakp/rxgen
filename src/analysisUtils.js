const esprima = require('esprima');
const estraverse = require('estraverse');
const { toSnake } = require('./stringUtils');
const { openFileToString } = require('./fileUtils');

// let ast;

module.exports = {
  /**
   * @description Creater AST from provided path to file
   * @param pathToFile - path to file to read
   * @returns {object} - AST object representation
   */
  createAST: pathToFile => {
    const toRead = openFileToString(pathToFile);
    if (toRead) {
      return esprima.parseModule(toRead);
    } else {
      return undefined;
    }
  },

  /**
   * @description Returns array of nodes with specified type from provided AST
   * @param ast - AST for node searching
   * @param finalNodeType - type of node to extract
   * @returns {[]} array of nodes
   */
  getNodesFromAST: (ast, finalNodeType) => {
    const allActionTypes = [];
    estraverse.traverse(ast, {
      enter: node => {
        if (
          node.type === 'FunctionExpression' ||
          node.type === 'FunctionDeclaration'
        )
          return estraverse.VisitorOption.Skip;
      },
      leave: node => {
        if (node.type === finalNodeType) {
          allActionTypes.push(node);
        }
      }
    });
    return allActionTypes;
  },

  filterNewActions: (newActions, allActions) => {
    const snakeNewActions = newActions.map(action => toSnake(action));
    return snakeNewActions.filter(x => !allActions.includes(x));
  },

  convertNodesToConstantNames: nodes => {
    const actionNames = nodes.map(node => node.id.name);
    console.debug(`Existing action types: ${actionNames}`);
    return actionNames;
  }
};
