import eslintPluginUnicorn from 'eslint-plugin-unicorn';

import eslintConfig from '@navikt/fp-config-eslint';

const IGNORED_UNICORN_RULES = {
    'unicorn/filename-case': 'off',
    'unicorn/name-replacements': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
};

export default [
    ...eslintConfig,
    eslintPluginUnicorn.configs['flat/recommended'],
    {
        rules: {
            ...IGNORED_UNICORN_RULES,
        },
    },
    {
        files: ['src/server.ts'],
        rules: {
            'unicorn/no-top-level-side-effects': 'off',
        },
    },
    {
        files: ['src/reverseProxy.test.ts'],
        rules: {
            'unicorn/no-top-level-assignment-in-function': 'off',
            'vitest/expect-expect': 'off',
        },
    },
];
