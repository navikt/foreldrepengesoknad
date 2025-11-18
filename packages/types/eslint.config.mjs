import baseConfig from '@navikt/fp-config-eslint';

export default [
    ...baseConfig,
    {
        ignores: ['src/fpoversiktDtoGenerert.ts', 'src/fpsoknadDtoGenerert.ts'],
    },
];
