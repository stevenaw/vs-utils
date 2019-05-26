'use strict';

const parser = require('vs-parse');
const Solution = require('./Solution');
const Project = require('./Project');

const parseSolution = (input) => {
	return parser.parseSolution(input, { deepParse: true }).then(data => new Solution(data));
};

const parseSolutionSync = (input) => {
  const data = parser.parseSolutionSync(input, { deepParse: true });
  return new Solution(data);
};

const parseProject = (input) => {
  return parser.parseProject(input, { deepParse: true }).then(data => new Project(data));
};

const parseProjectSync = (input) => {
  const data = parser.parseProjectSync(input, { deepParse: true });
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