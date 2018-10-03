// jest.config.js
const { pathsToModuleNameMapper } = require('ts-jest');
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./src/tsconfig.spec');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  bail: true,
  setupTestFrameworkScriptFile: '../jest.setup.ts',
  // testRegex: '/src/.*\\.(test|spec).(ts|tsx|js)$',
  moduleDirectories: ['node_modules', 'src'], // So important, whithout this, custom paths don't work
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: 'src/tsconfig.spec.json',
      diagnostics: false
    }
  },
  coverageDirectory: '../coverage',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  preset: 'ts-jest'
};
