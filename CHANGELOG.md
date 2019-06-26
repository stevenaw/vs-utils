# Change Log

## [1.0.0](https://github.com/stevenaw/vs-parse/compare/v0.0.6...v1.0.0) (TBD)
- BREAKING: Introduce new object model
  - `parseSolution` and `parseSolutionSync` now return an instance of a `Solution`
  - `parseProject` and `parseProjectSync` now return an instance of a `Project`
  - Most properties on each should map cleanly to vanilla objects returned in 0.x
- BREAKING: Drop Node 6 support