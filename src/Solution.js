'use strict';

const Project = require('./Project');
const internal = require('./internal');

class Solution {
  constructor(rawData) {
    const projects = internal.normalizeAndTransform((rawData && rawData.projects), proj => new Project(proj));

    this.fileFormatVersion = rawData && rawData.fileFormatVersion;
    this.visualStudioVersion = rawData && rawData.visualStudioVersion;
    this.minimumVisualStudioVersion = rawData && rawData.minimumVisualStudioVersion;
    this.projects = projects;

    this.data = () => rawData;
  }

  getProject(projectName) {
    const projects = this.projects.filter(project => project.name === projectName);
    return projects[0];
  }

  determinePackageVersions(packageName) {
    const result = this.projects.reduce((result, project) => {
      const version = project.determinePackageVersion(packageName);
      if (version && !result.find(v => v.version === version.version)) {
        result.push(version);
      }

      return result;
    }, []);

    return result;
  }

  determineAssemblyVersions(assemblyName) {
    const result = this.projects.reduce((result, project) => {
      const version = project.determineAssemblyVersion(assemblyName);
      if (version && !result.find(v => v.version === version.version)) {
        result.push(version);
      }

      return result;
    }, []);

    return result;
  }

  getAllPackageVersions() {
    const packages = {};
    this.projects.forEach(proj => {
      proj.packages.forEach(pkg => {
        if (!packages[pkg.name]) {
          packages[pkg.name] = [ pkg.version ];
        } else if (!packages[pkg.name].find(v => v.version == pkg.version)) {
          packages[pkg.name].push(pkg.version);
        }
      });
    });

    const entries = Object.entries(packages).sort((a, b) => a[0].localeCompare(b[0]));

    return new Map(entries);
  }

  getAllAssemblyVersions() {
    const refs = {};
    this.projects.forEach(proj => {
      proj.references.filter(ref => ref.version).forEach(ref => {
        if (!refs[ref.assemblyName]) {
          refs[ref.assemblyName] = [ ref.version ];
        } else if (!refs[ref.assemblyName].find(v => v.version == ref.version)) {
          refs[ref.assemblyName].push(ref.version);
        }
      });
    });

    const entries = Object.entries(refs).sort((a, b) => a[0].localeCompare(b[0]));

    return new Map(entries);
  }
}

module.exports = Solution;