'use strict';

const assert = require('chai').assert;
const path = require('path');
const vsUtils = require('../src');

describe('public api', () => {
  const slnDataFile = path.join(__dirname, '../samples/TestConsoleApplication/TestConsoleApplication.sln');
  const projDataFile = path.join(__dirname, '../samples/TestConsoleApplication/TestConsoleApplication/TestConsoleApplication.csproj');

  describe('#parseSolution()', () => {
    it('should parse same sync and async', async () => {
      const syncData = vsUtils.parseSolutionSync(slnDataFile);
      const asyncData = await vsUtils.parseSolution(slnDataFile);

      assert.deepEqual(syncData.data(), asyncData.data());
    });
  });

  describe('#parseProject()', () => {
    it('should parse same sync and async', async () => {
      const syncData = vsUtils.parseProjectSync(projDataFile);
      const asyncData = await vsUtils.parseProject(projDataFile);

      assert.deepEqual(syncData.data(), asyncData.data());
    });
  });
});