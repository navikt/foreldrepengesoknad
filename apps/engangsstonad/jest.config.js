module.exports = {
    roots: ['<rootDir>/src/app'],
    transform: {
      '^.+\\.(ts|tsx|js)?$': 'babel-jest',
      '^.+.(css|less)$': 'jest-transform-stub',
    },
    testEnvironment: 'jsdom',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'less', 'css'],
    moduleNameMapper: {
        '\\.(svg)$': '<rootDir>/mocks/fileMock.js',
        '\\.(less|css)$': 'identity-obj-proxy',
        '^app/(.*)$':  '<rootDir>/src/app/$1',
        '^assets/(.*)$':  '<rootDir>/src/app/assets/$1',
        '^components/(.*)$':  '<rootDir>/src/app/components/$1',
        '^containers/(.*)$':  '<rootDir>/src/app/containers/$1',
        '^styles/(.*)$':  '<rootDir>/src/app/styles/$1',
        '^util/(.*)$':  '<rootDir>/src/app/util/$1',
        '^common/(.*)$':  '<rootDir>/src/common/$1',
        '^intl/(.*)$':  '<rootDir>/src/app/intl/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/src/test/test-setup.js'],
    transformIgnorePatterns: ['<rootDir>.*(node_modules)(?!.*nav.*).*$'],
};
