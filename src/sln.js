const fs = require('fs');
const path = require('path');
const csproj = require('./csproj');

const getFileContentsOrFailSync = (file) => {
  if (!fs.existsSync(file)) {
    throw new Error('File not found: ' + file);
  }

  const input = fs.readFileSync(file, { encoding: 'utf-8' });

  return input;
};

const parseSolutionProject = (lineOfText) => {
  const projectRegex = /^Project\("\{([A-Z0-9]{8}\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{12})\}"\) = "([^"]+)", "([^"]+)", "\{([A-Z0-9]{8}\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{12})\}"/;
  const result = projectRegex.exec(lineOfText);

  if (result) {
    return {
      Id: result[4],
      Name: result[2],
      Path: result[3],
      LanguageId: result[1],
    }
  }
};

const parseSolution = (filePath, options = {}) => {
  const text = getFileContentsOrFailSync(filePath);
  const lines = text.replace(/\r\n/g, '\n').split('\n');

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

      if(project && project.Path) {
        const slnDir = path.dirname(filePath);
        const projectLocation = path.resolve(slnDir, project.Path);
        const projectData = csproj.parseProject(projectLocation);

        if(projectData) {
          returnValue.projects[i].Data = projectData;
        }
      }
    }
  }

  return returnValue;
};

module.exports = {
  parseSolution,
};
