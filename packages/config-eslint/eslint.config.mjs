import pluginJs from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const OFF = 0;
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
    ...storybook.configs['flat/recommended'],
    pluginReact.configs.flat.recommended,
    jsxA11y.flatConfigs.recommended,
    importPlugin.flatConfigs.recommended,
    reactHooks.configs.flat.recommended,
    eslintConfigPrettier,
    {
        rules: {
            ...vitest.configs.recommended.rules,
            'max-len': [ERROR, 160],
            'no-console': ERROR,
            'no-debugger': ERROR,
            'react/prop-types': OFF,
            'jsx-a11y/no-autofocus': OFF,
            'react/react-in-jsx-scope': OFF,
            'react/display-name': OFF,
            'import/no-duplicates': ERROR,
            'import/no-unresolved': OFF,
            'import/named': OFF,
            'vitest/no-disabled-tests': ERROR,
            '@typescript-eslint/no-restricted-types': [
                'error',
                {
                    types: {
                        'React.FC': {
                            message:
                                'Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177',
                        },
                        FC: {
                            message:
                                'Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177',
                        },
                        'React.FunctionComponent': {
                            message:
                                'Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177',
                        },
                        FunctionComponent: {
                            message:
                                'Useless and has some drawbacks, see https://github.com/facebook/create-react-app/pull/8177',
                        },
                    },
                },
            ],

            // Note: you must disable the base rule as it can report incorrect errors
            'no-use-before-define': OFF,
            '@typescript-eslint/no-use-before-define': [OFF],
            'no-shadow': OFF,
            '@typescript-eslint/no-shadow': [ERROR],
            'no-unused-vars': OFF,
            '@typescript-eslint/no-unused-vars': [ERROR, { ignoreRestSiblings: true }],
            'no-duplicate-imports': ERROR,
            '@typescript-eslint/array-type': [ERROR, { default: 'array-simple' }],
            '@typescript-eslint/ban-ts-comment': ERROR,
            'import/no-default-export': ERROR,
            'react-hooks/rules-of-hooks': ERROR,
            'react-hooks/set-state-in-effect': ERROR,
            'react-hooks/incompatible-library': OFF,
            'react-hooks/exhaustive-deps': OFF,
            'react-hooks/refs': OFF,

            // TODO Bør ein ha med desse to?
            'react/function-component-definition': [
                OFF,
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function',
                },
            ],

            // TODO (TOR) Ignorert inntil videre grunnet kost/nytte
            '@typescript-eslint/no-explicit-any': OFF,
        },
    },
    {
        files: ['**/*.stories.tsx', 'eslint.config.mjs'],
        rules: {
            'import/no-default-export': OFF,
            'react-hooks/rules-of-hooks': OFF,
        },
    },
];
