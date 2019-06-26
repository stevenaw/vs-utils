'use strict';

const parser = require('vs-parse');
const Solution = require('./Solution');
const Project = require('./Project');

const parseSolution = (input, options) => {
  const parserOptions = Object.assign({ deepParse: true }, options);
	return parser.parseSolution(input, parserOptions).then(data => new Solution(data));
};

const parseSolutionSync = (input, options) => {
  const parserOptions = Object.assign({ deepParse: true }, options);
  const data = parser.parseSolutionSync(input, parserOptions);
  return new Solution(data);
};

const parseProject = (input, options) => {
  const parserOptions = Object.assign({ deepParse: true }, options);
  return parser.parseProject(input, parserOptions).then(data => new Project(data));
};

const parseProjectSync = (input, options) => {
  const parserOptions = Object.assign({ deepParse: true }, options);
  const data = parser.parseProjectSync(input, parserOptions);
  return new Project(data);
};

module.exports = {
	parseSolution,
  parseSolutionSync,
  Solution,

  parseProject,
  parseProjectSync,
  Project,
};