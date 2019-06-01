'use strict';

const path = require('path');
const vsUtils = require('../src');

const slnFile = path.join(__dirname, './TestConsoleApplication/TestConsoleApplication.sln');

vsUtils.parseSolution(slnFile).then(solution => {
  const packages = {};
  
  solution.projects.forEach(proj => {
    proj.packages.forEach(pkg => {
      if (!packages[pkg.name]) {
        packages[pkg.name] = [ pkg.version ];
      } else if (!packages[pkg.name].find(v => v.version == pkg.version)) {
        packages[pkg.name].push(pkg.version);
      }
    });
  });

  const versionInfo = Object.keys(packages).sort().map(pkgName => ({
    name: pkgName,
    versions: packages[pkgName]
  }));

  console.log('----------------------------');
  console.log('Get All Packages in Solution');
  console.log('----------------------------');

  console.log(versionInfo)
});