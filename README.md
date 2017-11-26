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
        id: '1580E0CD-6DAA-4328-92F6-2E0B0F0AB7AF',
        name: 'TestNUnit3',
        path: 'TestNUnit3\\TestNUnit3.csproj',
        projectTypeId: 'FAE04EC0-301F-11D3-BF4B-00C04F79EFBC',
      }
    ]
  }
*/
``` 

A full parse of a solution and all its dependencies can be done by passing the [`deepParse` option](#deep-parse). This will force the parser to enumerate and parse all dependent projects (as well as their dependencies).

Example:
```js
const vsUtils = require('vs-utils');
const solutionData = vsUtils.solution.parseSolution('HelloWorld.sln' { deepParse: true });

console.log(solutionData);
/*
  Outputs:

  {
    projects: [
      {
        id: '1580E0CD-6DAA-4328-92F6-2E0B0F0AB7AF',
        name: 'TestNUnit3',
        path: 'TestNUnit3\\TestNUnit3.csproj',
        projectTypeId: 'FAE04EC0-301F-11D3-BF4B-00C04F79EFBC',
        codeFiles: [
          {
            fileName: 'MyFile.cs'
          }
        ],
        packages: [
          {
            name: 'NUnit.ConsoleRunner',
            version: '3.7.0',
            targetFramework: 'net45'  
          }
        ],
        references: [
          {
            assemblyName: 'NUnit.ConsoleRunner',
            version: '3.7.1.0',
            culture: 'neutral',
            processorArchitecture: 'MSIL',
            publicKeyToken: 'b035f5f7f11d50a3a'
          }
        ],
      }
    ]
  }
*/
``` 

### project
Project file parser and utility functions

#### parseProject
Parses a project file.

```js
const parseProject = (filePath, options = {})
```

Example:
```js
const vsUtils = require('vs-utils');
const projectData = vsUtils.project.parseProject('./myTestFile.csproj');

console.log(projectData);
/*
  Outputs:

  {
    references: [
      {
        assemblyName: 'Microsoft.VisualStudio.TestPlatform.TestFramework',
        version: '14.0.0.0',
        culture: 'neutral',
        processorArchitecture: 'MSIL',
        publicKeyToken: 'b03f5f7f11d50a3a'
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

A full parse of a project and all its dependencies can be done by passing the [`deepParse` option](#deep-parse). This will force the parser to enumerate and parse all packages.

Example:
```js
const vsUtils = require('vs-utils');
const projectData = vsUtils.project.parseProject('./myTestFile.csproj', { deepParse: true });

console.log(projectData);
/*
  Outputs:

  {
    references: [
      {
        assemblyName: 'Microsoft.VisualStudio.TestPlatform.TestFramework',
        version: '14.0.0.0',
        culture: 'neutral',
        processorArchitecture: 'MSIL',
        publicKeyToken: 'b03f5f7f11d50a3a'
      }
    ],
    codeFiles: [
      {
        fileName: 'Class1.cs'
      }
    ],
    packages: [
      {
        name: 'NUnit.ConsoleRunner',
        version: '14.0.0',
        targetFramework: 'net452',
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
      name: 'NUnit.ConsoleRunner',
      version: '14.0.0',
      targetFramework: 'net452',
    }
  ]
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

## Module Parser Options
An `options` object can be passed to a parsing function to customize its behaviour.

#### Deep Parse
`deepParse` - Specifying `true` will also read and parse all dependencies. Defaults to `false`.

Example: A solution is dependent on its projects, while a project is dependent on its pacakges.