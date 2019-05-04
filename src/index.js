'use strict';

const parser = require('vs-parse');
const Solution = require('./Solution');

const parseSolution = (input) => {
	return parser.parseSolution(input, { deepParse: true }).then(data => new Solution(data));
};

const parseSolutionSync = (input) => {
  const data = parser.parseSolutionSync(input, { deepParse: true });
  return new Solution(data);
};

module.exports = {
	parseSolution,
  parseSolutionSync
};