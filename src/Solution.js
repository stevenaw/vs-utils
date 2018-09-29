'use strict';

class Solution {
  constructor(rawData) {
  	Object.assign(this, {
        data() {
        	return rawData;
        }
    });
  }

  determinePackageVersions(packageName) {
  	const result = this.data().projects.reduce((result, project) => {
	    const foundPackage = project.packages && project.packages.find(ref => ref.name === packageName);

	    if(foundPackage && result.indexOf(foundPackage.version) === -1) {
	      result.push(foundPackage.version);
	    }

	    return result;
	  }, []);

  	return result;
  }

  determineAssemblyVersions(assemblyName) {
  	const result = this.data().projects.reduce((result, project) => {
	    const foundPackage = project.references && project.references.find(ref => ref.assemblyName === assemblyName);


	    if(foundPackage && result.indexOf(foundPackage.version) === -1) {
	      result.push(foundPackage.version);
	    }

	    return result;
	  }, []);


  	return result;
  }
}

module.exports = Solution;