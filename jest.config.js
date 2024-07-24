
module.exports = {
    transform: {
      '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
    },
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/**/__test__/*.ts?(x)',
      '!**/node_modules/**',
    ],
    coverageThreshold: {
      global: {
        branches:  0,
        functions: 0,
        lines: 0,
        statements: 0,
      },
    },
    coverageReporters: ['text-summary', 'lcov'],
  };
  