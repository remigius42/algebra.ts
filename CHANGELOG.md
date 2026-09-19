# CHANGELOG

<!-- every release section repeats headings like "Bug Fixes" -->
<!-- markdownlint-disable no-duplicate-heading -->

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

## [0.4.0](https://github.com/remigius42/algebra.ts/compare/v0.3.1...v0.4.0) (2026-09-18)

### ⚠ BREAKING CHANGES

- The build artifacts in `dist/` no longer contain the version in
  their file name and the `exports` map prevents deep imports into the package.
  Consumers importing `algebra.ts/dist/algebra-<version>.esm.js` have to import
  `algebra.ts` instead.

### Bug Fixes

- make package resolvable as a dependency ([58ae59d](https://github.com/remigius42/algebra.ts/commit/58ae59da0fafe24ba2a56ec2e3b703b28508890a))

## [0.4.1](https://github.com/remigius42/algebra.ts/compare/v0.4.0...v0.4.1) (2026-09-18)

## [0.4.2](https://github.com/remigius42/algebra.ts/compare/v0.4.1...v0.4.2) (2026-09-18)

## [0.5.0](https://github.com/remigius42/algebra.ts/compare/v0.4.2...v0.5.0) (2026-09-19)

### Features

- accept monomial divisors in the parser ([a183e9a](https://github.com/remigius42/algebra.ts/commit/a183e9aeee1317f00707ff78b8e16b3f0b6e5e1d))
- print negative degrees as denominators ([b97cb95](https://github.com/remigius42/algebra.ts/commit/b97cb950f56b42b93d9b8cc30a17014996021ff9))
- support symbolic coefficients in solveFor ([792e33d](https://github.com/remigius42/algebra.ts/commit/792e33dea4feb2094390538bf496038f7f9519bd))

### Bug Fixes

- drop variables which cancelled out ([2129054](https://github.com/remigius42/algebra.ts/commit/212905453bd14e68545200ea2e20c62d28987ccf))
- raise the divisor instead of the quotient ([5f80a8d](https://github.com/remigius42/algebra.ts/commit/5f80a8df71aab18317eccc682b164143871acb45))
