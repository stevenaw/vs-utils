var assert = require('chai').assert;

var csproj = require('../src/csproj');

describe('csproj', function() {

  describe('#parseProject()', function() {
    it('should should throw error if file doesnt exist', function() {
      assert.throws(() => csproj.parseProject('NOPE'));
    });

    it('should have property "references"', function() {
      let projectData = csproj.parseProject('./test/data/TestConsoleApplication/TestNUnit2/TestNUnit2.csproj');

      assert.exists(projectData.references);
      assert.isArray(projectData.references);
    });

    it('should have property "references"', function() {
      let projectData = csproj.parseProject('./test/data/TestConsoleApplication/TestNUnit2/TestNUnit2.csproj');

      assert.exists(projectData.references);
      assert.isArray(projectData.references);
    });
  });

});