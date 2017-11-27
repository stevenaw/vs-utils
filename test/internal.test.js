const assert = require('chai').assert;
const path = require('path');
const internal = require('../src/internal');

describe('internal', () => {

  describe('#fileExistsSync()', () => {
    it('should return false if file doesn\'t exist', () => {
      const result = internal.fileExistsSync('NOPE');

      assert.isFalse(result);
    });

    it('should return false if path is directory', () => {
      const result = internal.fileExistsSync('./data');

      assert.isFalse(result);
    });
  });

  describe('#getFileContentsOrFailSync()', () => {
    it('should throw error if file doesnt exist', () => {
      assert.throws(() => internal.getFileContentsOrFailSync('NOPE'));
    });

    it('should return contents if file exists', () => {
      const thisFile = path.resolve(__dirname, './internal.test.js');
      const result = internal.getFileContentsOrFailSync(thisFile);

      assert.isString(result);
    });
  });
});