const fs = require('fs');
const parse = require('xml-parser');

const parseAssemblyReference = (assemblyNode) => {
  const parts = assemblyNode.attributes.Include.split(/\, /g);

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

const parseProjectReferences = (projectXml) => {
  return projectXml.root.children.reduce((sum, value) => {
    if (value.name === 'ItemGroup') {
      const references = value.children.filter(function(i) {
        return i.name === 'Reference'
      });

      return sum.concat(references.map(parseAssemblyReference));
    }

    return sum;
  }, []);
};

const determineAssemblyVersion = (projectFile, assemblyName) => {
  const input = fs.readFileSync(projectFile, { encoding: 'utf-8' });
  const obj = parse(input);
  const projectReferences = parseProjectReferences(obj);

  const ref = projectReferences.find(ref => ref.AssemblyName === assemblyName);

  if (ref) {
    return ref.Version;
  }

  return undefined;
};

module.exports = {
  parseAssemblyReference,
  parseProjectReferences,
  determineAssemblyVersion,
};
