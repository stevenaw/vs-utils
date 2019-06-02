'use strict';

const assert = require('chai').assert;
const path = require('path');
const fs = require('fs-extra');
const vsUtils = require('../src');

describe('public api', () => {
  const slnDataFile = path.join(__dirname, '../samples/TestConsoleApplication/TestConsoleApplication.sln');
  const projDataFile = path.join(__dirname, '../samples/TestConsoleApplication/TestConsoleApplication/TestConsoleApplication.csproj');

  describe('#parseSolution()', async () => {
    const syncData = vsUtils.parseSolutionSync(slnDataFile);
    const asyncData = await vsUtils.parseSolution(slnDataFile);

    it('should parse same sync and async', () => {
      assert.deepEqual(syncData.data(), asyncData.data());
    });

    it('should parse expected values', async () => {
      const dataFile = path.join(__dirname, './data/solution.json');
      const data = await fs.readJson(dataFile);

      assert.deepEqual(asyncData.data(), data);
    });
  });

  describe('#parseProject()', async () => {
    const syncData = vsUtils.parseProjectSync(projDataFile);
    const asyncData = await vsUtils.parseProject(projDataFile);

    it('should parse same sync and async', () => {
      assert.deepEqual(syncData.data(), asyncData.data());
    });
  });
});