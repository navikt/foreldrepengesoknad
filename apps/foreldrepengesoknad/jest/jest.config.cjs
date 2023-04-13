module.exports = {
    coverageReporters: ['text-summary'],
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'less', 'css'],
    moduleNameMapper: {
        '\\.(svg)$': '<rootDir>/jest/mocks/fileMock.js',
        '\\.(less|css)$': 'identity-obj-proxy',
        '^uttaksplan/(.*)': '<rootDir>/src/uttaksplan/$1',
        '^app/(.*)': '<rootDir>/src/app/$1',
        '^utils-test/(.*)': '<rootDir>/src/utils-test/$1',
        '^stories/(.*)': '<rootDir>/src/storybook/stories/$1',
        '^storybook/(.*)': '<rootDir>/src/storybook/$1',
    },
    rootDir: '../',
    roots: ['<rootDir>/src/app/', '<rootDir>/src/uttaksplan'],
    setupFilesAfterEnv: ['<rootDir>/jest/setup.ts'],
    testEnvironment: 'jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    transform: {
        '^.+\\.(ts|tsx|js)?$': 'babel-jest',
        '^.+.(css|less)$': 'jest-transform-stub',
    },
    transformIgnorePatterns: ['<rootDir>.*(node_modules)(?!.*sif-common.*).*$'],
};
