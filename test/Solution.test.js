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
  });

  describe('#projects()', () => {
    it('should expose project instances', () => {
      for(let proj of sln.projects()) {
        assert.instanceOf(proj, Project);
      }
    });
  });
});