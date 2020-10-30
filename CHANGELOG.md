# Change Log

## [1.0.3](https://github.com/stevenaw/vs-utils/compare/v1.0.2...v1.0.3) (TBD)
- Update vs-parse to latest
- Update test dependencies

## [1.0.2](https://github.com/stevenaw/vs-utils/compare/v1.0.1...v1.0.2) (2019-12-31)
- Update vs-parse to latest
- Update test dependencies

## [1.0.1](https://github.com/stevenaw/vs-utils/compare/v1.0.0...v1.0.1) (2019-08-18)
- Update test modules to mitigate lodash vulnerability
- Update vs-parse to latest

## [1.0.0](https://github.com/stevenaw/vs-utils/compare/v0.0.6...v1.0.0) (2019-06-29)
- BREAKING: Introduce new object model
  - `parseSolution` and `parseSolutionSync` now return an instance of a `Solution`
  - `parseProject` and `parseProjectSync` now return an instance of a `Project`
  - Most properties on each should map cleanly to vanilla objects returned in 0.x
  - For straight-up parsing (without an object model) see new [vs-parse](https://www.npmjs.com/package/vs-parse) package.
- BREAKING: Drop Node 6 support