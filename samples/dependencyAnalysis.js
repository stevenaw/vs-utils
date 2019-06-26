'use strict';

const fs = require('fs');
const path = require('path');
const vsUtils = require('../src');

const slnFile = path.join(__dirname, './TestConsoleApplication/TestConsoleApplication.sln');
const dirRoot = path.dirname(slnFile);

const buffer = fs.readFileSync(slnFile);

vsUtils.parseSolution(buffer, { dirRoot }).then(solution => {
  console.log('-------------------------------');
  console.log('Dependency analysis in Solution');
  console.log('-------------------------------');

  const packageMap = solution.getAllPackageVersions();
  const filteredPackages = Array.from(packageMap.entries()).filter(value => value[1].length > 1);
  const packages = new Map(filteredPackages);
  console.log('Packages with multiple versions in solution');
  console.log(packages);

  const assemblyMap = solution.getAllAssemblyVersions();
  const filteredAssemblies = Array.from(assemblyMap.entries()).filter(value => value[1].length > 1);
  const assemblies = new Map(filteredAssemblies);
  console.log('Assemblies with multiple versions in solution');
  console.log(assemblies);
});