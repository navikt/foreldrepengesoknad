module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
    ],
    plugins: ['jest-dom', 'testing-library', 'typescript-sort-keys'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'typescript-sort-keys/interface': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
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
};
