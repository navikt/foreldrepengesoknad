module.exports = {
    setupFilesAfterEnv: ['./jest/setup.ts'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?|ts?)$',
    moduleNameMapper: {
        '\\.(css|jpg|png|svg|less)$': '<rootDir>/jest/mockFile.js',
        'nav-(.*)-style': '<rootDir>/jest/mockFile.js',
        '^uttaksplan/(.*)': '<rootDir>/src/uttaksplan/$1',
        '^common/(.*)': '<rootDir>/src/common/$1',
    },
    moduleDirectories: ['node_modules', 'src'],
    globals: {
        'ts-jest': {
            babelConfig: true,
            tsConfig: './tsconfig.json',
        },
    },
    rootDir: '../',
    roots: ['<rootDir>/src/app/'],
    coverageReporters: ['text-summary'],
    preset: 'ts-jest/presets/js-with-babel',
    testMatch: null,
};
