var assert = require('chai').assert;
var lib = require('../src/lib');

describe('lib', function() {

  describe('#parseSemver()', function() {
    var testCases = [
      {input: '1.2.3.4', output: '1.2.3'},
      {input: '1.2.3', output: '1.2.3'},
      {input: '1.2.0', output: '1.2.0'},
      {input: '1.0.0', output: '1.0.0'}
    ];

    for(var i=0; i < testCases.length; i++) {
      var testCase = testCases[i];

      it(`should return ${testCase.output} when given ${testCase.input}`, function() {
        var actualOutput = lib.parseSemver(testCase.input);

        assert.isObject(actualOutput);
        assert.equal(actualOutput.version, testCase.output);
      });
    }
  });
});