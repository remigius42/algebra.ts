# Contributing

Thank you for your interest in `algebra.ts`!

## Code of Conduct

This project and everyone participating in it is governed by the
[CONTRIBUTING.md Code of Conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code.

## Development environment setup

The following sections list the prerequisites and the steps required to
setup the development environment up until your first build and
deployment.

### Prerequisites

1. [Git](https://git-scm.com/downloads) for version control.
2. [Node.js](https://nodejs.org/en/) (the expected version can be found
   in [.nvmrc](.nvmrc)) and a package manager where `npm` is the
   recommended option.  
   While not strictly necessary, you might want to use a Node
   environment manager like [nvm](https://github.com/nvm-sh/nvm), which
   takes care of installing the required Node version based on `.nvmrc`
   automatically.
3. An IDE, [Visual Studio Code](https://code.visualstudio.com/) is the
   preferred option since the recommended extensions have been
   configured.

### Setup instructions

1. `git clone git@github.com:remigius42/algebra.ts` to clone the repository.
2. `npm install` to install the dependencies.
3. Install the recommended extensions in Visual Studio Code by opening
   the repository and confirming the installation in the automatic
   recommended extensions message.
4. If you are using a GUI for Git, please make sure that the Git
   configuration core.hooksPath is supported. Otherwise you might be
   able to workaround this issue via
   `rm -rf .git/hooks && ln -s ../.husky .git/hooks`
   (see a related [Husky issue comment](https://github.com/typicode/husky/issues/875#issue-809587895)
   for further details).

## Common development tasks

- `npm run build` to build the UMD and ES Module version both minified and not
  minified
- `npm test` to run the unit tests
- `npm run lint` to run the linter

## Releasing

The release is published by the build pipeline when a version tag is
pushed, not from a local machine. Pushing the tag therefore _is_ the
release, which is why the commit it points to should have passed the
pipeline before the tag is pushed.

1. Make sure that `main` is up to date and that its pipeline passed.
2. `npm version <patch|minor|major>` to bump the version in
   `package.json`, generate the changelog entry from the commit messages
   since the last release, commit both and create the tag.  
   Choose `minor` for a release which contains a `BREAKING CHANGE`
   footer, since the version is still below `1.0.0` and breaking changes
   are therefore signalled by the minor version.
3. `git push origin main` and wait for the pipeline to pass.
4. `git push origin v<version>` to publish the release. The pipeline
   attaches the build output to the tag and runs `npm publish`.
5. Update the version in the CDN links of [README.md](README.md),
   [docs/index.md](docs/index.md) and
   [docs/\_layouts/default.html](docs/_layouts/default.html) in a
   separate commit.  
   This has to happen after the release has been published, since the
   documentation is deployed from `main` and the links would otherwise
   refer to files which do not exist yet.

Note that the changelog only lists the commit types which are relevant
for users of the library, so maintenance commits such as `build` or `ci`
do not show up in it.
