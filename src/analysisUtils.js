const esprima = require('esprima');
const estraverse = require('estraverse');
const { _ } = require('lodash');
const { openFileToString } = require('./fileUtils');

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
    }
    return undefined;
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

  /**
   * performs set difference
   * @param newActions - actions from CLI
   * @param allActions - actions parsed from AST of action types
   * @returns {[]} - array of unique new actions
   */
  filterNewActions: (newActions, allActions) => {
    const camelNewActions = newActions.map(action => action);
    return camelNewActions.filter(x => !allActions.includes(x));
  },

  /**
   * converts array of AST nodes of constants to array of constant names
   * @param nodes - array of AST nodes
   * @returns {[]} - array of constant names
   */
  convertNodesToConstantNames: nodes => {
    const actionNames = nodes.map(node => node.id.name);
    console.debug(`Existing action types: ${actionNames}`);
    return actionNames;
  }
};
