# vs-utils
Node-based utilities for working with Visual Studio projects/solutions.

## Parsing Functions
### parseSolution
```js
parseSolution(file);
```

#### Arguments
- file
Can be a path, file contents, or buffer

#### Return value
A `Promise` which resolves to a [`Solution`](#solution) object


### parseSolutionSync
```js
parseSolutionSync(file);
```

#### Arguments
- file
Can be a path, file contents, or buffer

#### Return value
A [`Solution`](#solution) object



### parseProject
```js
parseProject(file);
```

#### Arguments
- file
Can be a path, file contents, or buffer

#### Return value
A `Promise` which resolves to a [`Project`](#project) object


### parseProjectSync
```js
parseProjectSync(file);
```

#### Arguments
- file
Can be a path, file contents, or buffer

#### Return value
A [`Project`](#project) object



## Classes

### Solution
#### Constructor
#### Properties
#### Functions

### Project
#### Constructor
#### Properties
#### Functions



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