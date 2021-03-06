# vs-utils

[![Azure Pipelines Build Status](https://dev.azure.com/sweerdenburg/vs-utils/_apis/build/status/stevenaw.vs-utils?branchName=master)](https://dev.azure.com/sweerdenburg/vs-utils/_build/latest?definitionId=3&branchName=master)

Node-based read-only object model for parsing and reading Visual Studio projects/solutions.

## Parsing Functions
### parseSolution
```js
parseSolution(file, opts);
```

#### Arguments
- **file** - Can be a path, file contents, or buffer
- **opts** - An options object (optional). For details see [`Parsing Options`](#parsing-options)

#### Return value
A `Promise` which resolves to a [`Solution`](#solution) object


### parseSolutionSync
```js
parseSolutionSync(file, opts);
```

#### Arguments
- **file** - Can be a path, file contents, or buffer
- **opts** - An options object (optional). For details see [`Parsing Options`](#parsing-options)

#### Return value
A [`Solution`](#solution) object


### parseProject
```js
parseProject(file, opts);
```

#### Arguments
- **file** - Can be a path, file contents, or buffer
- **opts** - An options object (optional). For details see [`Parsing Options`](#parsing-options)

#### Return value
A `Promise` which resolves to a [`Project`](#project) object


### parseProjectSync
```js
parseProjectSync(file, opts);
```

#### Arguments
- **file** - Can be a path, file contents, or buffer
- **opts** - An options object (optional). For details see [`Parsing Options`](#parsing-options)

#### Return value
A [`Project`](#project) object

## Parsing Options
An `options` object can be passed to a parsing function to customize its behaviour.

#### deepParse
`deepParse` - Specifying `true` will also read and parse all dependencies. Defaults to `false`.

Example: A solution is dependent on its projects, while a project is dependent on its packages.

#### dirRoot
`dirRoot` - The root directory under which the solution or project lives. Defaults to `undefined`.

Required when doing a deep parse of a solution or project from file contents or a buffer.


## Examples
For a full list of samples and demos, see the [samples](./samples) folder.
Alternately, clone the repository and run `npm run demo`.

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

### Parse  solution from buffer and find packages with multiple versions
```js
const vsUtils = require('vs-utils');
const fs = require('fs');

const buffer = await fs.readFile('HelloWorld.sln');
const solution = await vsUtils.parseSolution(buffer);

const packageMap = solution.getAllPackageVersions();
const filteredPackages = Array.from(packageMap.entries()).filter(value => value[1].length > 1);
const packages = new Map(filteredPackages);

console.log('Packages with multiple versions in solution');
console.log(packages);
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
Returns a [`Project`](#project) instance by name (or undefined if not found)
##### getAllPackageVersions()
Returns a `Map` of package names mapped to an array of [`Version`](#version) instances
##### getAllAssemblyVersions()
Returns a `Map` of assembly names mapped to an array of [`Version`](#version) instances

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