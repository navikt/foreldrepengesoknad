import eslintPluginUnicorn from 'eslint-plugin-unicorn';

import eslintConfig from '@navikt/fp-config-eslint';

const IGNORED_UNICORN_RULES = {
    'unicorn/filename-case': 'off',
    'unicorn/name-replacements': 'off',
    'unicorn/no-asterisk-prefix-in-documentation-comments': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-logical-operator-over-ternary': 'off',
    'unicorn/prefer-minimal-ternary': 'off',
    'unicorn/prefer-ternary': 'off',
    'unicorn/prevent-abbreviations': 'off',
};

export default [
    ...eslintConfig,
    eslintPluginUnicorn.configs.recommended,
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
];
