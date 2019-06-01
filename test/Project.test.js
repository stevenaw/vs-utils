'use strict';

const assert = require('chai').assert;
const fs = require('fs-extra');
const path = require('path');
const Project = require('../src/Project');

describe('Project', () => {
  const dataFile = path.join(__dirname, './data/project.json');
  const data = fs.readJsonSync(dataFile);
  const proj = new Project(data);

  describe('#data()', () => {
    it('should expose raw data', () => {
      assert.deepEqual(proj.data(), data);
    });

    it('should be undefined for falsy data', () => {
      const badSln = new Project(undefined);
      assert.notExists(badSln.data());
    });
  });

  describe('#determineAssemblyVersion()', () => {
    it('should return data for single version', () => {
      const version = proj.determineAssemblyVersion('Shouldly');
      const expectedVersion = '3.0.2.0';

      assert.equal(version, expectedVersion);
    });

    it('should return undefined for unfound assembly', () => {
      const version = proj.determineAssemblyVersion('Moq');

      assert.notExists(version);
    });
  });

  describe('#determinePackageVersion()', () => {
    it('should return data for single version', () => {
      const version = proj.determinePackageVersion('Shouldly');
      const expectedVersion = '3.0.2';

      assert.equal(version, expectedVersion);
    });

    it('should return undefined for unfound assembly', () => {
      const version = proj.determinePackageVersion('Moq');

      assert.notExists(version);
    });
  });
});