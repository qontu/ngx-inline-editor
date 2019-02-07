// jest.config.js
const { pathsToModuleNameMapper } = require('ts-jest/utils');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const {
  compilerOptions: { paths: tsPaths },
} = require('./tsconfig');

const jestPaths = Object.keys(tsPaths).reduce((paths, key) => {
  paths[key] = tsPaths[key].map(path => `<rootDir>/${path}`);

  return paths;
}, {});

module.exports = {
  bail: true,
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleDirectories: ['node_modules', 'src'], // So important, whithout this, custom paths don't work
  coverageDirectory: './coverage',
  moduleNameMapper: pathsToModuleNameMapper(jestPaths),
  preset: 'jest-preset-angular',
};
