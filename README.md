# vs-utils

Node-based utilities for working with Visual Studio projects/solutions.

## Modules

### lib
Support functions

#### parseSemver
A very simple semver parser

```js
const vsUtils = require('vs-utils');

const versionString = '1.2.3.4';
const versionInfo = vsUtils.lib.parseSemver(versionString);

console.log(versionInfo);
/*
 Outputs:

 {
    major: 1,
    minor: 2,
    patch: 3,
    build: 4,
    version: 1.2.3
  }
*/
```

### csproj
Project file parser and utility functions

#### parseProject
Parses a project file

```js
const vsUtils = require('vs-utils');

const projectData = vsUtils.csproj.parseProject('./myTestFile.csproj');

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

#### determineAssemblyVersion
Determine assembly version of a project

```js
const vsUtils = require('vs-utils');

const projectData = vsUtils.csproj.parseProject('./myTestFile.csproj');
const version = vsUtils.csproj.determineAssemblyVersion(projectData, 'Microsoft.VisualStudio.TestPlatform.TestFramework');

console.log(version);
/*
  Outputs:

  '14.0.0.0'
*/
``` 