'use strict';

const parser = require('vs-parse');

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

const normalizeAndTransform = (items, xform) => {
  if (!items) {
    return [];
  }

  return items.filter(item => item).map((item, i) => xform(item));
};

class Project {
  constructor(rawData) {
    Object.assign(this, {
      data() {
        return rawData;
      }
    });

    const refs = normalizeAndTransform((rawData && rawData.references), buildAssemblyReference);
    Object.assign(this, {
      references() {
        return refs;
      }
    });

    const pkgs = normalizeAndTransform((rawData && rawData.packages), buildPackageReference);
    Object.assign(this, {
      packages() {
        return pkgs;
      }
    });
  }

  determinePackageVersion(packageName) {
    const pkg = this.packages().find(pkg => pkg.name === packageName);
    return pkg && pkg.version;
  }

  determineAssemblyVersion(assemblyName) {
    const ref = this.references().find(ref => ref.assemblyName === assemblyName);
    return ref && ref.version;
  }
}

module.exports = Project;