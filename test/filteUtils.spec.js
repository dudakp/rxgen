/* eslint-disable no-undef */
const { openFileToString } = require('../src/fileUtils');

describe('file testing', () => {
  const pathToMock = './test/mocks/actionTypes_mock.js';
  const invalidPathToMock = './test/mocks/no.js';
  it('should open existing file to string constant', () => {
    expect(typeof openFileToString(pathToMock)).toBe('string');
  });

  it('should not be empty', () => {
    expect(openFileToString(pathToMock).length).toBeGreaterThanOrEqual(80);
  });

  it('should return undefined from non-existing file', () => {
    expect(typeof openFileToString(invalidPathToMock)).toBe('undefined');
  });
});
