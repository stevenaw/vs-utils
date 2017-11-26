const assert = require('chai').assert;
const sln = require('../src/sln');

describe('sln', () => {

  describe('#parseSolution()', () => {
    it('should should throw error if file doesnt exist', () => {
      assert.throws(() => sln.parseSolution('NOPE'));
    });

    describe('#parseSolution().projects', () => {
      it('should have property "projects"', () => {
        const solutionData = sln.parseSolution('./test/data/TestConsoleApplication/TestConsoleApplication.sln');

        assert.exists(solutionData.projects);
        assert.isArray(solutionData.projects);
      });

      it('should have expected length', () => {
        const result = sln.parseSolution('./test/data/TestConsoleApplication/TestConsoleApplication.sln').projects;

        assert.equal(result.length, 4);

        for(let i=0; i < result.length; i++) {
          assert.isObject(result[i]);
        }
      });

      it('should be array of correct shape', () => {
        const result = sln.parseSolution('./test/data/TestConsoleApplication/TestConsoleApplication.sln').projects;

        for(let i=0; i < result.length; i++) {
          assert.isObject(result[i]);

          assert.property(result[i], 'LanguageId');
          assert.property(result[i], 'Name');
          assert.property(result[i], 'Path');
          assert.property(result[i], 'Id');
        }
      });

      it('should parse supported props as expected', () => {
        const result = sln.parseSolution('./test/data/TestConsoleApplication/TestConsoleApplication.sln').projects;

        for(let i=0; i < result.length; i++) {
          assert.isString(result[i].LanguageId);
          assert.isString(result[i].Name);
          assert.isString(result[i].Path);
          assert.isString(result[i].Id);
        }
      });

      it('should parse sample lib correctly', () => {
        const result = sln.parseSolution('./test/data/TestConsoleApplication/TestConsoleApplication.sln').projects;

        const sampleProject = result[1];

        assert.equal(sampleProject.Id, '1580E0CD-6DAA-4328-92F6-2E0B0F0AB7AF');
        assert.equal(sampleProject.Name, 'TestNUnit3');
        assert.equal(sampleProject.Path, 'TestNUnit3\\TestNUnit3.csproj');
        assert.equal(sampleProject.LanguageId, 'FAE04EC0-301F-11D3-BF4B-00C04F79EFBC');
      });

      it('should shallow parse when no options', () => {
        const result = sln.parseSolution('./test/data/TestConsoleApplication/TestConsoleApplication.sln').projects;

        for(let i=0; i < result.length; i++) {
          assert.notProperty(result[i], 'Data');
        }
      });

      it('should shallow parse when request no deep parse', () => {
        const parseOptions = { deepParse: false };
        const result = sln.parseSolution('./test/data/TestConsoleApplication/TestConsoleApplication.sln').projects;

        for(let i=0; i < result.length; i++) {
          assert.notProperty(result[i], 'Data');
        }
      });

      it('should deep parse when requested', () => {
        const parseOptions = { deepParse: true };
        const result = sln.parseSolution('./test/data/TestConsoleApplication/TestConsoleApplication.sln', parseOptions).projects;

        for(let i=0; i < result.length; i++) {
          assert.property(result[i], 'Data');
          assert.isObject(result[i].Data);
        }
      });
    });

  });
});