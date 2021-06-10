module.exports = {
    setupFilesAfterEnv: ['./jest/setup.ts'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleNameMapper: {
        '\\.(css|jpg|png|svg|less)$': '<rootDir>/node_modules/jest-css-modules',
        'nav-(.*)-style': '<rootDir>/node_modules/jest-css-modules',
        '^uttaksplan/(.*)': '<rootDir>/src/uttaksplan/$1',
        '^common/(.*)': '<rootDir>/src/common/$1',
        '^app/(.*)': '<rootDir>/src/app/$1',
        '^shared/(.*)': '<rootDir>/src/shared/$1',
    },
    moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx'],
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.json',
            babelConfig: true,
        },
    },
    rootDir: '../',
    coverageReporters: ['text-summary'],
    modulePathIgnorePatterns: ['akseptansetest', '<rootDir>/old/', '<rootDir>/src/common/'],
    preset: 'ts-jest/presets/js-with-babel',
    testMatch: null,
};
