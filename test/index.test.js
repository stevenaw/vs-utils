'use strict';

const assert = require('chai').assert;
const path = require('path');
const vsUtils = require('../src');

describe('public api', () => {
  const dataFile = path.join(__dirname, './data/solution.json');

  describe('#parseSolution()', () => {
    it('should parse same sync and async', async () => {
      const syncData = vsUtils.parseSolutionSync(dataFile);
      const asyncData = await vsUtils.parseSolution(dataFile);

      assert.deepEqual(syncData.data(), asyncData.data());
    });
  });
});