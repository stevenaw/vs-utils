'use strict';

const Project = require('./Project');
const internal = require('./internal');

class Solution {
  constructor(rawData) {
    const projects = internal.normalizeAndTransform((rawData && rawData.projects), proj => new Project(proj));

  	Object.assign(this, {
      data() {
      	return rawData;
      },
      fileFormatVersion: rawData && rawData.fileFormatVersion,
      visualStudioVersion: rawData && rawData.visualStudioVersion,
      minimumVisualStudioVersion: rawData && rawData.minimumVisualStudioVersion,
      projects,
    });
  }

  getProject(projectName) {
    const projects = this.projects.filter(project => project.name === projectName);
    return projects[0];
  }

  determinePackageVersions(packageName) {
    const result = this.projects.reduce((result, project) => {
      const version = project.determinePackageVersion(packageName);
      if (version && result.indexOf(version) === -1) {
        result.push(version);
      }

      return result;
    }, []);

    return result;
  }

  determineAssemblyVersions(assemblyName) {
    const result = this.projects.reduce((result, project) => {
      const version = project.determineAssemblyVersion(assemblyName);
      if (version && result.indexOf(version) === -1) {
        result.push(version);
      }

      return result;
    }, []);

    return result;
  }
}

module.exports = Solution;