const fs = require('fs');
const path = require('path');
const csproj = require('./csproj');
const helpers = require('./internal');

const parseSolutionProject = (lineOfText) => {
  const projectRegex = /^Project\("\{([A-Z0-9]{8}\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{12})\}"\) = "([^"]+)", "([^"]+)", "\{([A-Z0-9]{8}\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{12})\}"/;
  const result = projectRegex.exec(lineOfText);

  if (result) {
    return {
      id: result[4],
      name: result[2],
      relativePath: result[3],
      projectTypeId: result[1],
    }
  }
};

const parseSolution = (filePath, options = {}) => {
  const contents = helpers.getFileContentsOrFailSync(filePath);
  const lines = contents.replace(/\r\n/g, '\n').split('\n');

  const returnValue = {
    projects: []
  };

  for(let i = 0; i < lines.length; i++) {
    if(lines[i].startsWith('Project("{')) {
      const solutionProject = parseSolutionProject(lines[i]);

      if(solutionProject) {
        returnValue.projects.push(solutionProject);
      }
    }
  }

  if(options.deepParse) {    
    for(let i = 0; i < returnValue.projects.length; i++) {
      const project = returnValue.projects[i];

      if(project && project.relativePath) {
        const slnDir = path.dirname(filePath);
        const projectLocation = path.join(slnDir, project.relativePath);

        if(helpers.fileExistsSync(projectLocation)) {
          const projectData = csproj.parseProject(projectLocation, options);

          if(projectData) {
            returnValue.projects[i] = Object.assign({}, project, projectData);
          }
        }
      }
    }
  }

  return returnValue;
};

module.exports = {
  parseSolution,
};
