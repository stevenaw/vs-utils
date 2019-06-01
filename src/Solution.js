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
}

module.exports = Solution;