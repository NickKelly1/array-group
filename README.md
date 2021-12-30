## Getting started

1. Clone the repository
    - `git clone git@github.com:NickKelly1/nkp-template.git`
    - (optional): use GitHub's `template` feature.
2. Install dependencies and run tests
    1. If using nvm, run `nvm use` to set the NodeJS version
    2. run `npm install`
    3. run `npm test`
3. Find and replace placeholders in the project
    1. ArrayMap holds key-array with arrays of the given value types
    2. @nkp/array-map
    3. https://github.com/NickKelly1/nkp-template
    4. NickKelly1
    5. array-map
    6. @nkp
    7. array-map
4. Remove stubs and reset the repos state
    1. Remove the contents of `src/index.ts`
    2. set the testEnvironment in `jest.config.ts
    3. Remove `src/examples`
5. Add an NPM_TOKEN to the repository for CI
    1. Using npmjs, generate a CI token
    2. Add the token to this GitHub repositories secrets as "NPM_TOKEN"
6. Set up the README.MD

# @nkp/array-map

Fill in the following:

```txt
![npm version](https://badge.fury.io/js/%40@nkp%2Farray-map.svg)
[![Node.js Package](https://github.com/NickKelly1/array-map/actions/workflows/release.yml/badge.svg)](https://github.com/NickKelly1/array-map/actions/workflows/release.yml)
![Known Vulnerabilities](https://snyk.io/test/github/NickKelly1/array-map/badge.svg)
```

---DESCRIPTION-TEXT---

## Table of contents

- [Installation](#installation)
  - [npm](#npm)
  - [yarn](#yarn)
  - [Exports](#exports)
- [Usage](#usage)

## Installation

### NPM

```sh
npm install @nkp/array-map
```

### Yarn

```sh
yarn add @nkp/array-map
```

### Exports

`@nkp/array-map` targets CommonJS and ES modules. To utilise ES modules consider using a bundler like `webpack` or `rollup`.

## Usage

---USAGE-TEXT---

## Publishing

To a release a new version:

1. Update the version number in package.json
2. Push the new version to the `master` branch on GitHub
3. Create a `new release` on GitHub for the latest version

This will trigger a GitHub action that tests and publishes the npm package.
