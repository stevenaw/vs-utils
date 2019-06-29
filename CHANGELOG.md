# Change Log

## [1.0.0](https://github.com/stevenaw/vs-parse/compare/v0.0.6...v1.0.0) (TBD)
- BREAKING: Introduce new object model
  - `parseSolution` and `parseSolutionSync` now return an instance of a `Solution`
  - `parseProject` and `parseProjectSync` now return an instance of a `Project`
  - Most properties on each should map cleanly to vanilla objects returned in 0.x
  - For straight-up parsing (without an object model) see new [vs-parse](https://www.npmjs.com/package/vs-parse) package.
- BREAKING: Drop Node 6 support