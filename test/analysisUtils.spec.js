/* eslint-disable no-undef */
const {
  createAST,
  getNodesFromAST,
  convertNodesToConstantNames
} = require('../src/analysisUtils');

describe('AST testing', () => {
  let ast;
  let nodesFromAST;
  const pathToMock = './test/mocks/actionTypes_mock.js';
  const invalidPathToMock = './test/mocks/no.js';
  beforeAll(() => {
    ast = createAST(pathToMock);
    nodesFromAST = getNodesFromAST(ast, 'VariableDeclarator');
  });

  it('should return AST from existing file', () => {
    expect(typeof createAST(pathToMock)).toBe('object');
  });

  it('should return undefined from non-existing file', () => {
    expect(typeof createAST(invalidPathToMock)).toBe('undefined');
  });

  it('should return non-empty array of nodes from defined AST', () => {
    expect(getNodesFromAST(ast, 'VariableDeclarator').length).toBe(2);
  });

  it('should return non-empty array of VariableDeclarator nodes from defined AST', () => {
    expect(getNodesFromAST(ast, 'VariableDeclarator'));
  });

  it('should convert nodes to array of constant names', () => {
    expect(convertNodesToConstantNames(nodesFromAST)).toContain(
      'FETCH_STARTED'
    );
  });
});
