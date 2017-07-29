const utils = require('../src/lib.js');
const csproj = require('../src/csproj.js');

const determineNunitRunner = (version) => {
  const semver = utils.parseSemver(version);

  if(semver.major < 3) {
    return `NUnit.Runners.${semver.version}`;
  } else {
    return `NUnit.ConsoleRunner.${semver.version}`;

  }
}

const determineNunitExecutable = (version, arch) => {
  const semver = utils.parseSemver(version);

  if(semver.major < 3) {
    const archFlag = arch === 'X86' ? '-x86' : '';
    return `nunit-console${archFlag}.exe`;
  } else {
    return 'nunit3-console.exe';

  }
}


let nunitVersion = csproj.determineAssemblyVersion('./test/data/TestConsoleApplication/TestNUnit2/TestNUnit2.csproj', 'nunit.framework');
let runner = determineNunitRunner(nunitVersion);
let executable = determineNunitExecutable(nunitVersion);

console.log(`${runner}\\tools\\${executable}`);


nunitVersion = csproj.determineAssemblyVersion('./test/data/TestConsoleApplication/TestNUnit3/TestNUnit3.csproj', 'nunit.framework');
runner = determineNunitRunner(nunitVersion);
executable = determineNunitExecutable(nunitVersion);

console.log(`${runner}\\tools\\${executable}`);