const fs = require('fs');
const parse = require('xml-parser');

const parseCodeFile = (node) => {
  const fileName = node.attributes.Include;

  return {
    fileName
  };
};

const parseAssemblyReference = (node) => {
  const parts = node.attributes.Include.split(/\, /g);

  const result = {
    AssemblyName: parts[0],
    Version: undefined,
    Culture: undefined,
    ProcessorArchitecture: undefined,
    PublicKeyToken: undefined
  };

  for(let i = 1; i < parts.length; i++) {
    const asmPartKeyValue = parts[i].split(/=/g);

    if(asmPartKeyValue.length === 2) {
      if(asmPartKeyValue[0] === 'Version') {
        result.Version = asmPartKeyValue[1];
      } else if(asmPartKeyValue[0] === 'Culture') {
        result.Culture = asmPartKeyValue[1];
      } else if(asmPartKeyValue[0] === 'processorArchitecture') {
        result.ProcessorArchitecture = asmPartKeyValue[1];
      } else if(asmPartKeyValue[0] === 'PublicKeyToken') {
        result.PublicKeyToken = asmPartKeyValue[1];
      }
    }
  }

  return result;
};

const parseProject = (projectFile) => {
  if (!fs.existsSync(projectFile)) {
    throw new Error('File not found: ' + projectFile);
  }

  const input = fs.readFileSync(projectFile, { encoding: 'utf-8' });
  const projectXml = parse(input);

  return projectXml.root.children.reduce((projectData, directChild) => {
    if (directChild.name === 'ItemGroup') {
      const children = directChild.children;

      // TODO: Sequential dynamic mapping instead of assuming all children are same
      if (children && children.length) {
        if (children[0].name === 'Reference') {
          const refs = children.map(parseAssemblyReference);
          projectData.references = projectData.references.concat(refs);
        } else if (children[0].name === 'Compile') {
          const refs = children.map(parseCodeFile);
          projectData.codeFiles = projectData.codeFiles.concat(refs);
        }
      }
    }

    return projectData;
  }, {
    references: [],
    codeFiles: [],
  });
};

const determineAssemblyVersion = (projectData, assemblyName) => {
  // TODO: Case-insensitive?
  const ref = projectData.references.find(ref => ref.AssemblyName === assemblyName);

  if (ref) {
    return ref.Version;
  }

  return null;
};

module.exports = {
  parseProject,
  determineAssemblyVersion,
};