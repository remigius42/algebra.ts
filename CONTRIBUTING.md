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
