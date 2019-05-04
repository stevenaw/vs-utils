'use strict';

const path = require('path');
const vsUtils = require('../src');

const slnFile = path.join(__dirname, './TestConsoleApplication/TestConsoleApplication.sln');
vsUtils.parseSolution(slnFile).then(solution => {
  const projects = solution.projects();
  const packageData = solution.determinePackageVersions('NUnit');
  const asmData = solution.determineAssemblyVersions('nunit.framework');
  const application = solution.getProject('TestConsoleApplication');

  console.log(application);
  console.log(projects);
  console.log(packageData);
  console.log(asmData);
})




/*const determineNunitRunner = (version) => {
  const semver = utils.parseSemver(version);

  if(parseInt(semver.major, 10) < 3) {
    return `NUnit.Runners.${semver.version}`;
  } else {
    return `NUnit.ConsoleRunner.${semver.version}`;
  }
}

const determineNunitExecutable = (version, arch) => {
  const semver = utils.parseSemver(version);

  if(parseInt(semver.major, 10) < 3) {
    const archFlag = arch === 'X86' ? '-x86' : '';
    return `nunit-console${archFlag}.exe`;
  } else {
    return 'nunit3-console.exe';
  }
}


let projectData = csproj.parseProject('./test/data/TestConsoleApplication/TestNUnit2/TestNUnit2.csproj');
let nunitVersion = projectData.references.find(ref => ref.assemblyName === 'nunit.framework').version;
let runner = determineNunitRunner(nunitVersion);
let executable = determineNunitExecutable(nunitVersion);

console.log('Determine version of NUnit based on project references (NUnit 2):');
console.log(`${runner}\\tools\\${executable}\r\n`);


projectData = csproj.parseProject('./test/data/TestConsoleApplication/TestNUnit3/TestNUnit3.csproj');
nunitVersion = projectData.references.find(ref => ref.assemblyName === 'nunit.framework').version;
runner = determineNunitRunner(nunitVersion);
executable = determineNunitExecutable(nunitVersion);

console.log('Determine version of NUnit based on project references (NUnit 3):');
console.log(`${runner}\\tools\\${executable}\r\n`);


let packages = csproj.parsePackages('./test/data/TestConsoleApplication/TestNUnit3/packages.config');
nunitVersion = packages.find(ref => ref.name === 'NUnit.ConsoleRunner').version;
runner = determineNunitRunner(nunitVersion);
executable = determineNunitExecutable(nunitVersion);

console.log('Determine version of NUnit based on project packages:');
console.log(`${runner}\\tools\\${executable}\r\n`);*/


/*nunitVersion = determinePackageVersions(solution, 'NUnit.ConsoleRunner');
runner = determineNunitRunner(nunitVersion);
executable = determineNunitExecutable(nunitVersion);

console.log('Determine version of NUnit based on solution packages:');
console.log(`${runner}\\tools\\${executable}\r\n`);
*/