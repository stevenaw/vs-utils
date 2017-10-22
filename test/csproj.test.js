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
  });

  describe('#parsePackages()', () => {
    it('should should throw error if file doesnt exist', () => {
      assert.throws(() => csproj.parsePackages('NOPE'));
    });

    it('should return array"', () => {
      const result = csproj.parsePackages('./test/data/TestConsoleApplication/TestNUnit3/packages.config');

      assert.isArray(result);
    });

    it('should have expected length"', () => {
      const result = csproj.parsePackages('./test/data/TestConsoleApplication/TestNUnit3/packages.config');

      assert.equal(result.length, 10);

      for(let i=0; i < result.length; i++) {
        assert.isObject(result[i]);
      }
    });

    it('should be array of correct shape"', () => {
      const result = csproj.parsePackages('./test/data/TestConsoleApplication/TestNUnit3/packages.config');

      for(let i=0; i < result.length; i++) {
        assert.isObject(result[i]);

        assert.property(result[i], 'Name');
        assert.property(result[i], 'Version');
        assert.property(result[i], 'TargetFramework'); 
      }
    });

    it('should parse supported props as expected"', () => {
      const result = csproj.parsePackages('./test/data/TestConsoleApplication/TestNUnit3/packages.config');

      for(let i=0; i < result.length; i++) {
        assert.isString(result[i].Name);
        assert.isString(result[i].Version);
        assert.isString(result[i].TargetFramework);
      }
    });

    it('should parse sample lib correctly"', () => {
      const result = csproj.parsePackages('./test/data/TestConsoleApplication/TestNUnit3/packages.config');

      const nunitConsoleRunner = result[4];

      assert.equal(nunitConsoleRunner.Name, 'NUnit.ConsoleRunner');
      assert.equal(nunitConsoleRunner.Version, '3.7.0');
      assert.equal(nunitConsoleRunner.TargetFramework, 'net452');
    });
  });

});