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

        assert.property(result[i], 'AssemblyName');
        assert.property(result[i], 'Version');
        assert.property(result[i], 'Culture');
        assert.property(result[i], 'ProcessorArchitecture');
        assert.property(result[i], 'PublicKeyToken');   
      }
    });

    it('should parse supported props as expected"', () => {
      const result = csproj.parsePackages('./test/data/TestConsoleApplication/TestNUnit3/packages.config');

      for(let i=0; i < result.length; i++) {
        assert.isString(result[i].AssemblyName, 'NUnit.ConsoleRunner');
        assert.isString(result[i].Version, '3.7.0');
        assert.isUndefined(result[i].Culture);
        assert.isUndefined(result[i].ProcessorArchitecture);
        assert.isUndefined(result[i].PublicKeyToken);
      }
    });

    it('should parse sample lib correctly"', () => {
      const result = csproj.parsePackages('./test/data/TestConsoleApplication/TestNUnit3/packages.config');

      const nunitConsoleRunner = result[4];

      assert.equal(nunitConsoleRunner.AssemblyName, 'NUnit.ConsoleRunner');
      assert.equal(nunitConsoleRunner.Version, '3.7.0');
      assert.equal(nunitConsoleRunner.Culture, undefined);
      assert.equal(nunitConsoleRunner.ProcessorArchitecture, undefined);
      assert.equal(nunitConsoleRunner.PublicKeyToken, undefined);  
    });
  });

});