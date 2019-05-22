'use strict';

const path = require('path');
const vsUtils = require('../src');

const determineNunitRunner = (semver) => {
  if(parseInt(semver.major, 10) < 3) {
    return `NUnit.Runners.${semver.version}`;
  } else {
    return `NUnit.ConsoleRunner.${semver.version}`;
  }
};

const determineNunitExecutable = (semver, arch) => {
  if(parseInt(semver.major, 10) < 3) {
    const archFlag = (arch && arch.toUpperCase() === 'X86') ? '-x86' : '';
    return `nunit-console${archFlag}.exe`;
  } else {
    return 'nunit3-console.exe';
  }
};

const slnFile = path.join(__dirname, './TestConsoleApplication/TestConsoleApplication.sln');
vsUtils.parseSolution(slnFile).then(solution => {
  const packageData = solution.determinePackageVersions('NUnit');
  const asmData = solution.determineAssemblyVersions('nunit.framework');

  console.log(packageData);
  console.log(asmData);
  console.log(solution);

  return solution;
}).then(solution => {
  solution.projects().forEach(project => {
    const projectName = project.data().name;
    const versionInfo = project.determinePackageVersion('NUnit');

    if (versionInfo) {
      const runner = determineNunitRunner(versionInfo);
      const executable = determineNunitExecutable(versionInfo, 'X64');

      console.log(`Found NUnit executable for project ${projectName}: `);
      console.log(`${runner}\\tools\\${executable}\r\n`);
    }
  });
});