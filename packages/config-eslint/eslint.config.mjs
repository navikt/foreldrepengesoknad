import eslintReact from '@eslint-react/eslint-plugin';
import pluginJs from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import * as importPlugin from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactYouMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const OFF = 0;
const ERROR = 2;

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        plugins: {
            vitest,
        },
        languageOptions: { globals: globals.browser },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: '../config-typescript/tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    ...storybook.configs['flat/recommended'],
    eslintReact.configs['recommended-typescript'],
    jsxA11y.flatConfigs.recommended,
    {
        plugins: {
            'import-x': importPlugin,
        },
    },
    reactYouMightNotNeedAnEffect.configs.recommended,
    eslintConfigPrettier,
    {
        rules: {
            ...vitest.configs.recommended.rules,
            'curly': [ERROR, 'all'],
            'max-len': [ERROR, 160],
            'no-console': ERROR,
            'no-debugger': ERROR,
            'jsx-a11y/no-autofocus': OFF,
            'import-x/no-duplicates': ERROR,
            'import-x/no-unresolved': OFF,
            'import-x/named': OFF,
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
            'import-x/no-default-export': ERROR,
            '@eslint-react/rules-of-hooks': ERROR,
            '@eslint-react/set-state-in-effect': ERROR,
            '@eslint-react/exhaustive-deps': OFF,
            '@eslint-react/unsupported-syntax': OFF,

            // TODO (TOR) Ignorert inntil videre grunnet kost/nytte
            '@typescript-eslint/no-explicit-any': OFF,
        },
    },
    {
        files: ['**/*.stories.tsx', 'eslint.config.mjs'],
        rules: {
            'import-x/no-default-export': OFF,
            '@eslint-react/rules-of-hooks': OFF,
        },
    },
    {
        files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
        rules: {
            '@typescript-eslint/no-unsafe-assignment': OFF,
            '@typescript-eslint/no-unsafe-argument': OFF,
            '@typescript-eslint/no-unsafe-member-access': OFF,
            '@typescript-eslint/no-unsafe-call': OFF,
            '@typescript-eslint/no-unsafe-return': OFF,
        },
    },
];
