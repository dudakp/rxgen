const _ = require('lodash');
const { appendToFile, saveToFile } = require('./fileUtils');

let actionTypesSnake = [];
let actionCreatorsCamel = [];

module.exports = {
  setupActions: syncActions => {
    actionTypesSnake = syncActions.map(action =>
      _.snakeCase(action).toUpperCase()
    );
    actionCreatorsCamel = syncActions.map(action => _.camelCase(action));
  },

  generateActionTypes: () => {
    const actionTypesCode = actionTypesSnake.map(
      action => `export const ${action} = "${action}";\n`
    );
    appendToFile('./actionTypes.js', actionTypesCode.join(''));
  },

  generateSyncActionCreators: () => {
    const imports = `import {
    ${actionTypesSnake.map(action => action)}\n} from "./actionTypes";\n\n`;

    const actionCreators = actionCreatorsCamel.map(
      action =>
        `export const ${action} = payload => ({
  type: ${_.snakeCase(action).toUpperCase()},
  payload
});\n`
    );
    saveToFile('./actionCreators.js', imports, actionCreators.join(''));
  },

  generateReducer: () => {
    if (actionTypesSnake.length === 0) return;

    const imports = `import {
    ${actionTypesSnake.map(action => action)}\n} from "./actionTypes";\n\n`;

    const initialState = `const initialState = {
  
  };\n\n`;

    const reducer0 = `export default (state = initialState, { type, payload }) => {
    switch (type) {`;

    const reducer1 = actionTypesSnake.map(
      action =>
        `case ${action}:
        return {...state, ...payload};\n`
    );

    const reducer2 = `default:
        return state;
    }
  };`;

    saveToFile(
      './reducer.js',
      imports,
      initialState,
      reducer0,
      reducer1.join(''),
      reducer2
    );
  }
};
