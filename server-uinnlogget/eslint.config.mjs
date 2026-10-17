import eslintPluginUnicorn from 'eslint-plugin-unicorn';

import eslintConfig from '@navikt/fp-config-eslint';

const IGNORED_UNICORN_RULES = {
    'unicorn/filename-case': 'off',
    'unicorn/name-replacements': 'off',
    'unicorn/no-asterisk-prefix-in-documentation-comments': 'off',
    'unicorn/no-async-iterator-callback': 'off',
    'unicorn/no-invalid-temporal-arithmetic': 'off',
    'unicorn/no-leading-empty-lines': 'off',
    'unicorn/no-negated-condition': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-unnecessary-array-flat-map': 'off',
    'unicorn/no-unnecessary-parameters': 'off',
    'unicorn/no-unused-iterator-helper': 'off',
    'unicorn/no-using-resource-escape': 'off',
    'unicorn/prefer-combined-guards': 'off',
    'unicorn/prefer-continue': 'off',
    'unicorn/prefer-default-parameters': 'off',
    'unicorn/prefer-early-return': 'off',
    'unicorn/prefer-escaped-irregular-whitespace': 'off',
    'unicorn/prefer-iterator-helpers': 'off',
    'unicorn/prefer-iterator-zip': 'off',
    'unicorn/prefer-literal-ascii': 'off',
    'unicorn/prefer-logical-operator-over-ternary': 'off',
    'unicorn/prefer-minimal-ternary': 'off',
    'unicorn/prefer-promise-static-methods': 'off',
    'unicorn/prefer-short-escape-sequences': 'off',
    'unicorn/prefer-single-object-destructuring': 'off',
    'unicorn/prefer-temporal-conversion': 'off',
    'unicorn/prefer-ternary': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/require-text-decoder-streaming': 'off',
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
