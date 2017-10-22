const assert = require('chai').assert;
const csproj = require('../src/csproj');

describe('csproj', () => {

  describe('#parseProject()', () => {
    it('should should throw error if file doesnt exist', () => {
      assert.throws(() => csproj.parseProject('NOPE'));
    });

    it('should have property "references"', () => {
      const projectData = csproj.parseProject('./test/data/TestConsoleApplication/TestNUnit2/TestNUnit2.csproj');

      assert.exists(projectData.references);
      assert.isArray(projectData.references);
    });

    it('should have property "references"', () => {
      const projectData = csproj.parseProject('./test/data/TestConsoleApplication/TestNUnit2/TestNUnit2.csproj');

      assert.exists(projectData.references);
      assert.isArray(projectData.references);
    });
  });

});