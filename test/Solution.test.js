'use strict';

const assert = require('chai').assert;
const fs = require('fs-extra');
const path = require('path');
const Solution = require('../src/Solution');
const Project = require('../src/Project');

describe('Solution', () => {
  const dataFile = path.join(__dirname, './data/solution.json');
  const data = fs.readJsonSync(dataFile);
  const sln = new Solution(data);

  describe('#data()', () => {
    it('should expose raw data', () => {
      assert.deepEqual(sln.data(), data);
    });

    it('should be undefined for falsy data', () => {
      const badSln = new Solution(undefined);
      assert.notExists(badSln.data());
    });
  });

  describe('#projects', () => {
    it('should expose project instances', () => {
      for(let proj of sln.projects) {
        assert.instanceOf(proj, Project);
      }
    });

    it('should be empty for falsy data', () => {
      const badSln = new Solution(undefined);
      assert.isEmpty(badSln.projects);
    });

    it('should be empty on falsy project data', () => {
      const badData = { projects: [ undefined ]};
      const badSln = new Solution(badData);
      assert.isEmpty(badSln.projects);
    });
  });

  describe('#getProject()', () => {
    it('should return found instance', () => {
      const proj = sln.getProject('TestNUnit3');

      assert.exists(proj);
      assert.instanceOf(proj, Project);
      assert.equal(proj.data().name, 'TestNUnit3');
    });

    it('should return undefined when not found', () => {
      const proj = sln.getProject('TestNUnit32');

      assert.notExists(proj);
    });
  });

  describe('#determinePackageVersions()', () => {
    it('should return data for single version', () => {
      const versions = sln.determinePackageVersions('Shouldly').map(v => v.originalString);
      const expectedVersions = [ '3.0.2' ];

      assert.equal(versions.length, expectedVersions.length);
      for (let expectedVersion of expectedVersions) {
        assert.include(versions, expectedVersion);
      }
    });

    it('should return data for multiple versions of same package', () => {
      const versions = sln.determinePackageVersions('NUnit').map(v => v.originalString);
      const expectedVersions = [ '3.7.1', '2.6.4' ];

      assert.equal(versions.length, expectedVersions.length);
      for (let expectedVersion of expectedVersions) {
        assert.include(versions, expectedVersion);
      }
    });

    it('should return single item for multiple packages of same version', () => {
      const versions = sln.determinePackageVersions('Newtonsoft.Json').map(v => v.originalString);
      const expectedVersions = [ '12.0.2' ];
      
      assert.equal(versions.length, expectedVersions.length);
      for (let expectedVersion of expectedVersions) {
        assert.include(versions, expectedVersion);
      }
    });
  });

  describe('#determineAssemblyVersions()', () => {
    it('should return data for single version', () => {
      const versions = sln.determineAssemblyVersions('Shouldly').map(v => v.originalString);
      const expectedVersions = [ '3.0.2.0' ];

      assert.equal(versions.length, expectedVersions.length);
      for (let expectedVersion of expectedVersions) {
        assert.include(versions, expectedVersion);
      }
    });

    it('should return data for multiple versions of same package', () => {
      const versions = sln.determineAssemblyVersions('nunit.framework').map(v => v.originalString);
      const expectedVersions = [ '3.7.1.0', '2.6.4.14350' ];

      assert.equal(versions.length, expectedVersions.length);
      for (let expectedVersion of expectedVersions) {
        assert.include(versions, expectedVersion);
      }
    });

    it('should return single item for multiple packages of same version', () => {
      const versions = sln.determineAssemblyVersions('Newtonsoft.Json').map(v => v.originalString);
      const expectedVersions = [ '12.0.0.0' ];

      assert.equal(versions.length, expectedVersions.length);
      for (let expectedVersion of expectedVersions) {
        assert.include(versions, expectedVersion);
      }
    });
  });
});