# vs-utils

Node-based utilities for working with Visual Studio projects/solutions.

## Modules

### solution
Solution file parser

#### parseSolution
Parses a solution file.

```js
const parseSolution = (filePath, options = {})
```

Example:
```js
const vsUtils = require('vs-utils');
const solutionData = vsUtils.solution.parseSolution('HelloWorld.sln');

console.log(solutionData);
/*
  Outputs:

  {
    projects: [
      {
        Id: '1580E0CD-6DAA-4328-92F6-2E0B0F0AB7AF',
        Name: 'TestNUnit3',
        Path: 'TestNUnit3\\TestNUnit3.csproj',
        LanguageId: 'FAE04EC0-301F-11D3-BF4B-00C04F79EFBC',
      }
    ]
  }
*/
``` 

##### Options
An optional `options` argument can be provided to control behaviour:

`deepParse` - Specifying `true` will also read and parse each project file and include it in the results as a `Data` property.

### project
Project file parser and utility functions

#### parseProject
Parses a project file.

```js
const vsUtils = require('vs-utils');
const projectData = vsUtils.project.parseProject('./myTestFile.csproj');

console.log(projectData);
/*
  Outputs:

  {
 	  references: [
      {
        AssemblyName: 'Microsoft.VisualStudio.TestPlatform.TestFramework',
        Version: '14.0.0.0',
        Culture: 'neutral',
        ProcessorArchitecture: 'MSIL',
        PublicKeyToken: 'b03f5f7f11d50a3a'
      }
  	],
    codeFiles: [
      {
        fileName: 'Class1.cs'
      }
    ]
  }
*/
``` 

#### parsePackages
Parses a nuget package file.

```js
const vsUtils = require('vs-utils');
const packages = vsUtils.project.parsePackages('./packages.config');

console.log(packages);
/*
  Outputs:

  [
    {
      Name: 'NUnit.ConsoleRunner',
      Version: '14.0.0',
      TargetFramework: 'net452',
    }
  ]
*/
``` 

#### determineAssemblyVersion
Determine assembly version of a project

```js
const vsUtils = require('vs-utils');

const projectData = vsUtils.project.parseProject('./myTestFile.csproj');
const version = vsUtils.project.determineAssemblyVersion(projectData, 'Microsoft.VisualStudio.TestPlatform.TestFramework');

console.log(version);
/*
  Outputs:

  '14.0.0.0'
*/
``` 

### lib
Support functions

#### parseSemver
A very simple semver parser. Mostly a wrapper over standardized tools, with support for .NET-specific assembly versioning.

```js
const vsUtils = require('vs-utils');

const versionString = '1.2.3.4';
const versionInfo = vsUtils.lib.parseSemver(versionString);

console.log(versionInfo);
/*
 Outputs:

 {
    major: '1',
    minor: '2',
    patch: '3',
    version: '1.2.3'
  }
*/
```
