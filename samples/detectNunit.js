'use strict';

const path = require('path');
const vsUtils = require('../');

const slnFile = path.join(__dirname, './TestConsoleApplication/TestConsoleApplication.sln');

vsUtils.parseSolution(slnFile).then(solution => {
  const testProjects = solution.projects.filter(proj => proj.determinePackageVersion('NUnit'));
  if (!testProjects.length) {
    throw new Error('Could not find any test projects');
  }

  const runnerPaths = testProjects.map(project => {
    const semver = project.determinePackageVersion('NUnit');
    const arch = 'x64';

    let runnerName;
    let executable;

    if (parseInt(semver.major, 10) < 3) {
      const archFlag = (arch && arch.toUpperCase() === 'X86') ? '-x86' : '';

      runnerName = 'NUnit.Runners';
      executable = `nunit-console${archFlag}.exe`;
    } else {
      runnerName = 'NUnit.ConsoleRunner';
      executable = 'nunit3-console.exe';
    }

    if (!project.determinePackageVersion(runnerName)) {
      throw new Error(`Could not find installed test runner package '${runnerName}' of version ${semver} in project '${project.name}'`);
    }

    const runnerPath = `.\\packages\\${runnerName}.${semver.version}\\tools\\${executable}`;

    return runnerPath;
  });

  console.log('------------');
  console.log('Detect NUnit');
  console.log('------------');

  runnerPaths.forEach(runnerPath => console.log(`Console runner path: ${runnerPath}`));
});