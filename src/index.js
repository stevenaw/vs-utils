'use strict';

const parser = require('vs-parse');
const Solution = require('./Solution');

const parseSolution = (input) => {
	const rawData = parser.parseSolution(input, { deepParse: true });

	return new Solution(rawData);
};

module.exports = {
	parseSolution
};