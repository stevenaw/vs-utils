# vs-utils
Node-based read-only object model for parsing and reading Visual Studio projects/solutions.

## Parsing Functions
### parseSolution
```js
parseSolution(file);
```

#### Arguments
- **file** - Can be a path, file contents, or buffer

#### Return value
A `Promise` which resolves to a [`Solution`](#solution) object


### parseSolutionSync
```js
parseSolutionSync(file);
```

#### Arguments
- **file** - Can be a path, file contents, or buffer

#### Return value
A [`Solution`](#solution) object


### parseProject
```js
parseProject(file);
```

#### Arguments
- **file** - Can be a path, file contents, or buffer

#### Return value
A `Promise` which resolves to a [`Project`](#project) object


### parseProjectSync
```js
parseProjectSync(file);
```

#### Arguments
- **file** - Can be a path, file contents, or buffer

#### Return value
A [`Project`](#project) object



## Examples
### Parse solution from path and enumerate projects
```js
const vsUtils = require('vs-utils');

const solution = await vsUtils.parseSolution('HelloWorld.sln');

solution.projects.forEach(project => {
  const projectName = project.name;
  console.log(`Project: ${project.name}\r\n`);
});
```

### Parse solution from file contents and find test projects
```js
const vsUtils = require('vs-utils');
const fs = require('fs');

const contents = await fs.readFile('HelloWorld.sln', { encoding: 'utf-8' });
const solution = await vsUtils.parseSolution(contents);
const testProjects = solution.projects.filter(proj => proj.determinePackageVersion('NUnit'));
```

### Parse test project and find relevant test runner
```js
const vsUtils = require('vs-utils');
const fs = require('fs');

const buffer = await fs.readFile('TestProject.csproj');
const project = await vsUtils.parseProject(contents);
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

console.log(`Console runner path: ${runnerPath}`);
```

## Object Model

### Solution
#### Properties

- **fileFormatVersion** - `string` - The version of the Visual Studio file format
- **visualStudioVersion** - `string` - The version of Visual Studio to use the solution
- **minimumVisualStudioVersion** - `string` - The minimum version of Visual Studio to use the solution
- **projects** - `array` - An array of [`Project`](#project) instances

#### Functions

##### data()
Returns the underlying parsed project info
##### determinePackageVersions(packageName)
Returns an array of [`Version`](#version) instances for the given package name
##### determineAssemblyVersions(assemblyName)
Returns an array of [`Version`](#version) instances for the given assembly name
##### getProject(projectName)
Get and return a [`Project`](#project) instance by name (or undefined if not found)

### Project
#### Properties

- **id** - `string` - The ID of the project
- **name** - `string` - The name of the project
- **relativePath** - `string` - The path of the project, relative to the solution file
- **projectTypeId** - `string` - The Type ID of the project
- **codeFiles** - `array` - An array of strings of code files in the project
- **packages** - `array` - An array of packages in the project
- **references** - `array` - An array of references in the project

#### Functions

##### data()
Returns the underlying parsed project info
##### determinePackageVersion(packageName)
Returns the [`Version`](#version) instance of the package in the project
##### determineAssemblyVersion(assemblyName)
Returns the [`Version`](#version) instance of the assembly in the project

### Version
#### Properties

- **major** - `string` - The major version number
- **minor** - `string` - The minor version number
- **patch** - `string` - The patch version number
- **version** - `string` - The full version string
- **originalString** - `string` - The original version string