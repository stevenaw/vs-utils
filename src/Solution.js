'use strict';

const Project = require('./Project');

class Solution {
  constructor(rawData) {
  	Object.assign(this, {
      data() {
      	return rawData;
      }
    });

    const projData = (rawData && rawData.projects) || [];
    const projects = projData.filter(proj => proj).map((proj, i) => new Project(proj));
    Object.assign(this, {
      projects() {
        return projects;
      }
    });
  }

  getProject(projectName) {
    const projects = this.projects().filter(project => project.data().name === projectName);
    return projects[0];
  }

  determinePackageVersions(packageName) {
    const result = this.projects().reduce((result, project) => {
      const version = project.determinePackageVersion(packageName);
      if (version && result.indexOf(version) === -1) {
        result.push(version);
      }

      return result;
    }, []);

    return result;
  }

  determineAssemblyVersions(assemblyName) {
    const result = this.projects().reduce((result, project) => {
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