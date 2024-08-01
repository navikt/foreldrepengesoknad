import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import vitest from 'eslint-plugin-vitest';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        settings: {
            react: {
                version: 'detect',
            },
        },
        plugins: {
            vitest,
        },
        languageOptions: { globals: globals.browser },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    jsxA11y.flatConfigs.recommended,
    eslintConfigPrettier,
    {
        rules: {
            ...vitest.configs.recommended.rules,
            'max-len': [ERROR, 160],
            'no-console': WARNING,
            'no-debugger': WARNING,
            'react/prop-types': OFF,
            'jsx-a11y/no-autofocus': OFF,
            'react/react-in-jsx-scope': OFF,
            'react/display-name': OFF,

            // Note: you must disable the base rule as it can report incorrect errors
            'no-use-before-define': OFF,
            '@typescript-eslint/no-use-before-define': [ERROR],
            'no-shadow': OFF,
            '@typescript-eslint/no-shadow': [ERROR],
            'no-unused-vars': OFF,
            '@typescript-eslint/no-unused-vars': [ERROR],

            // TODO Bør ein ha med desse to?
            'react/function-component-definition': [
                OFF,
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function',
                },
            ],
            'no-use-before-define': OFF,
            '@typescript-eslint/no-use-before-define': [OFF],

            // TODO (TOR) Ignorert inntil videre grunnet kost/nytte
            '@typescript-eslint/no-explicit-any': OFF,
            '@typescript-eslint/ban-ts-comment': OFF,
        },
    },
];

// rules: {
//     'no-duplicate-imports': 'error',
//     '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
//     '@typescript-eslint/no-var-requires': 'off',
//     '@typescript-eslint/explicit-module-boundary-types': 'off',
//     '@typescript-eslint/no-non-null-assertion': 'off',
//     '@typescript-eslint/no-unused-vars': [
//         'error',
//         { vars: 'all', args: 'all', ignoreRestSiblings: true, varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
//     ],
// },
