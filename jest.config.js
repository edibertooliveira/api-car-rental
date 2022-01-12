require('dotenv').config();
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  collectCoverage: false,
  testRegex: '.spec.ts$',
  transform: {
    '.+\\.(t|j)s$': 'ts-jest',
  },
  maxWorkers: 1,
  clearMocks: true,
  testTimeout: 120000,
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  globals: {
    NODE_ENV: 'test',
  },
  verbose: true,
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/*.service.(t|j)s',
    '<rootDir>/src/modules/**/*.controller.(t|j)s',
    '<rootDir>/src/shared/helpers/**/*.(t|j)s',
    '<rootDir>/src/shared/providers/**/*.provider.(t|j)s',
  ],
  coveragePathIgnorePatterns: ['node_modules', 'dist'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};
