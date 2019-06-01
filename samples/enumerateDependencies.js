'use strict';

const path = require('path');
const vsUtils = require('../src');

const slnFile = path.join(__dirname, './TestConsoleApplication/TestConsoleApplication.sln');

vsUtils.parseSolution(slnFile).then(solution => {
  const packageData = solution.determinePackageVersions('NUnit');
  const asmData = solution.determineAssemblyVersions('nunit.framework');


  console.log('----------------------');
  console.log('Enumerate Dependencies');
  console.log('----------------------');
  console.log(packageData);
  console.log(asmData);
});