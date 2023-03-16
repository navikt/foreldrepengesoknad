module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    coverageReporters: ['text-summary'],
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'less', 'css'],
    moduleNameMapper: {
        '\\.(svg)$': '<rootDir>/mocks/fileMock.js',
        '\\.(less|css)$': 'identity-obj-proxy',
        '^app/(.*)': '<rootDir>/src/app/$1',
        '^common/(.*)': '<rootDir>/src/common/$1',
    },
    rootDir: './',
    roots: ['<rootDir>/src/app/'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    transform: {
        '^.+\\.(ts|tsx|js)?$': 'babel-jest',
        '^.+.(css|less)$': 'jest-transform-stub',
      },
    transformIgnorePatterns: ['<rootDir>.*(node_modules)(?!.*nav.*).*$'],
};
