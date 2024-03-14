# CHANGELOG

## [0.2.7](https://github.com/remigius42/algebra.ts/compare/0.2.6...0.2.7) (2024-02-27)

- Update dependencies
- Migrate Makefile into NPM scripts
- Migrate Travis to GitHub Actions build
- Reformat codebase with Prettier

## [0.2.8](https://github.com/remigius42/algebra.ts/compare/0.2.7...0.2.8) (2024-02-28)

- Add Husky and lint-staged for pre-commit checks
- Add ESLint and remove jshint
- Add Prettier
- Add markdownlint
- Add CSpell spellchecker
- Add Visual Studio Code configuration

## [0.3.0](https://github.com/remigius42/algebra.ts/compare/v0.2.8...v0.3.0) (2024-03-11)

### Features

- add `copy` method to `Equation` ([e751136](https://github.com/remigius42/algebra.ts/commit/e7511369b8b6346a07626e1fd8ee027f3d20f734))
- add `variableNames` to get variables used ([9b2bd94](https://github.com/remigius42/algebra.ts/commit/9b2bd94c847b6124ac27f62ce32d52e948536e38))
- add support for inequations (<, <=, >, >=) ([e9bc9a5](https://github.com/remigius42/algebra.ts/commit/e9bc9a50c169f1e314518241a02acabe195b34fd))
- extend `algebra.toTex` for arrays ([3be5a12](https://github.com/remigius42/algebra.ts/commit/3be5a1268c51b91be9bc55cef104c4b5956f3cd4))
- initial migration to TypeScript ([a5c7cb1](https://github.com/remigius42/algebra.ts/commit/a5c7cb1c20f85cb153179ba247158af79130c9d2))
- optionally evaluate equation to boolean ([6bcf927](https://github.com/remigius42/algebra.ts/commit/6bcf92707b6825a8a7f24edf5466e2d2b1c6c178))

### Bug Fixes

- `maxDegree` returns `0` for constants ([18a4737](https://github.com/remigius42/algebra.ts/commit/18a4737671a0a3ab545d896d78f4fd96498b2d5b))
- `maxDegreeOfVariable` returns `0` for missing ([1f208f1](https://github.com/remigius42/algebra.ts/commit/1f208f1359fe930f9b81333beef4ae7045a2460f))

## [0.3.1](https://github.com/remigius42/algebra.ts/compare/v0.3.0...v0.3.1) (2024-03-14)

- Documentation improvements
