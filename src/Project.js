'use strict';

const parser = require('vs-parse');
const internal = require('./internal');
const Version = require('./Version');

class Project {
  constructor(rawData) {
    const references = internal.normalizeAndTransform((rawData && rawData.references), buildAssemblyReference);
    const packages = internal.normalizeAndTransform((rawData && rawData.packages), buildPackageReference);
    const codeFiles = internal.normalizeAndTransform((rawData && rawData.codeFiles), file => file.fileName);

    this.id = rawData && rawData.id;
    this.name = rawData && rawData.name;
    this.relativePath = rawData && rawData.relativePath;
    this.projectTypeId = rawData && rawData.projectTypeId;
    this.codeFiles = codeFiles;
    this.packages = packages;
    this.references = references;

    this.data = () => rawData;
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

const buildAssemblyReference = (rawData) => {
  const versionString = rawData.version;
  const semver = parser.parseSemverSync(versionString);

  return {
    assemblyName: rawData.assemblyName,
    culture: rawData.culture,
    processorArchitecture: rawData.processorArchitecture,
    publicKeyToken: rawData.publicKeyToken,
    hintPath: rawData.hintPath,
    versionString: versionString,
    version: semver && new Version(semver),
  }
}

const buildPackageReference = (rawData) => {
  const versionString = rawData.version;
  const semver = parser.parseSemverSync(versionString);

  return {
    name: rawData.name,
    targetFramework: rawData.targetFramework,
    versionString: versionString,
    version: semver && new Version(semver),
  }
}

module.exports = Project;