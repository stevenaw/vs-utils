'use strict';

const parser = require('vs-parse');
const internal = require('./internal');

const buildAssemblyReference = (rawData) => {
  const versionString = rawData.version;
  const version = parser.parseSemverSync(versionString);

  return {
    assemblyName: rawData.assemblyName,
    culture: rawData.culture,
    processorArchitecture: rawData.processorArchitecture,
    publicKeyToken: rawData.publicKeyToken,
    hintPath: rawData.hintPath,
    versionString: versionString,
    version: version,
  }
}

const buildPackageReference = (rawData) => {
  const versionString = rawData.version;
  const version = parser.parseSemverSync(versionString);

  return {
    name: rawData.name,
    targetFramework: rawData.targetFramework,
    versionString: versionString,
    version: version,
  }
}

class Project {
  constructor(rawData) {
    const references = internal.normalizeAndTransform((rawData && rawData.references), buildAssemblyReference);
    const packages = internal.normalizeAndTransform((rawData && rawData.packages), buildPackageReference);
    const codeFiles = internal.normalizeAndTransform((rawData && rawData.codeFiles), file => file.fileName);

    Object.assign(this, {
      data() {
        return rawData;
      },
      id: rawData && rawData.id,
      name: rawData && rawData.name,
      relativePath: rawData && rawData.relativePath,
      projectTypeId: rawData && rawData.projectTypeId,
      codeFiles,
      packages,
      references,
    });
  }

  determinePackageVersion(packageName) {
    const pkg = this.packages.find(pkg => pkg.name === packageName);
    return pkg && pkg.version;
  }

  determineAssemblyVersion(assemblyName) {
    const ref = this.references.find(ref => ref.assemblyName === assemblyName);
    return ref && ref.version;
  }
}

module.exports = Project;