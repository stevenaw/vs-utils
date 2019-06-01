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
### Solution parsing
```js
const vsUtils = require('vs-utils');

// Parse from a string
const solutionFromPath = vsUtils.parseSolutionSync('HelloWorld.sln');

// Parse from a string
const fs = require('fs');
const contents = fs.readFileSync('HelloWorld.sln', { encoding: 'utf-8' });
const solutionFromString = vsUtils.parseSolutionSync(contents);

// Parse from a buffer
const fs = require('fs');
const buffer = fs.readFileSync('HelloWorld.sln');
const solutionFromBuffer = vsUtils.parseSolutionSync(buffer);
```

### Project parsing
```js
const vsUtils = require('vs-utils');

// Parse from a string
const projectFromPath = vsUtils.parseProjectSync('HelloWorld.csproj');

// Parse from a string
const fs = require('fs');
const contents = fs.readFileSync('HelloWorld.csproj', { encoding: 'utf-8' });
const projectFromString = vsUtils.parseProjectSync(contents);

// Parse from a buffer
const fs = require('fs');
const buffer = fs.readFileSync('HelloWorld.csproj');
const projectFromBuffer = vsUtils.parseProjectSync(buffer);
```


## Object Model

### Solution
#### Properties

- **fileFormatVersion** - `string` - The version of the Visual Studio file format
- **visualStudioVersion** - `string` - The version of Visual Studio to use the solution
- **minimumVisualStudioVersion** - `string` - The minimum version of Visual Studio to use the solution
- **projects** - `array` - An array of `Project` instances

#### Functions

##### data()
Returns the underlying parsed project info
##### determinePackageVersions(packageName)
Returns an array of version strings in the solution for the given package name
##### determineAssemblyVersions(assemblyName)
Returns an array of version strings in the solution for the given assembly name
##### getProject(projectName)
Get and return a project instance by name (or undefined if not found)

### Project
#### Properties

- **id** - `UUID` - The ID of the project
- **name** - `string` - The name of the project
- **relativePath** - `string` - The path of the project, relative to the solution file
- **projectTypeId** - `UUID` - The Type ID of the project
- **codeFiles** - `array` - An array of strings of code files in the project
- **packages** - `array` - An array of packages in the project
- **references** - `array` - An array of references in the project

#### Functions

##### data()
Returns the underlying parsed project info
##### determinePackageVersion(packageName)
Returns the version string of the package in the project
##### determineAssemblyVersion(assemblyName)
Returns the version string of the assembly in the project