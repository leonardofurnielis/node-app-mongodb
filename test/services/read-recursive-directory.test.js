'use strict';

const readRecursiveDirectory = require('../../services/read-recursive-directory');

describe('Read Recursive Directory', () => {
  test('When called, should return a list directory files', () => {
    const fileList = readRecursiveDirectory('/config');
    expect(fileList).toHaveLength(10);
  });

  test('When dicrectory not found, should return error ENOENT', () => {
    let thrownError;
    try {
      readRecursiveDirectory('/foo');
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError.code).toEqual('ENOENT');
  });
});
