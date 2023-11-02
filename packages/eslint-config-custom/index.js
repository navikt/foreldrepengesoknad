module.exports = {
    extends: [
        'turbo',
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
    ],
    plugins: ['@typescript-eslint', 'jest-dom', 'testing-library'],
    parser: '@typescript-eslint/parser',
    rules: {
        'no-duplicate-imports': 'error',
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            { vars: 'all', args: 'all', ignoreRestSiblings: true, varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
        ],
        'react/prop-types': 'off',
        'react/display-name': 'off',
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    env: {
        node: true,
    },
};
