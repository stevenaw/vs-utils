'use strict';

class Project {
  constructor(rawData) {
    Object.assign(this, {
      data() {
        return rawData;
      }
    });

    const refData = (rawData && rawData.references) || [];
    Object.assign(this, {
      references() {
        return refData;
      }
    });

    const pkgData = (rawData && rawData.packages) || [];
    Object.assign(this, {
      packages() {
        return pkgData;
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