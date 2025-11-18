import type { KnipConfig } from 'knip';

// Avhengigheter som ikke brukes overalt per nå. Men som vi ønsker ha tilgjengelig.
const avhengigheterViVilHaUansett = [
    '@navikt/aksel-icons',
    '@navikt/ds-css',
    '@navikt/ds-tailwind',
    '@tailwindcss/vite',
    'tailwindcss'
];

// Usikker på om de med storybook trengs. jsdom og coverage refereres av vitest.
const avhengigheterRelatertTilTest = [
    '@vitest/coverage-v8',
    'jsdom',
    '@storybook/addon-actions',
    '@storybook/cli',
    'playwright'
];

const avhenegigheterKnipIkkeForstårBrukes = [
    '@formatjs/intl-pluralrules',
    '@sentry/browser',
    'i18n-iso-countries'
];

const config: KnipConfig = {
    ignore: [
        'server/**',
        '**/mock-storage.cjs',
        '**/@types/externals.d.ts',
        '**/bootstrap.tsx',
        '**/openapi-ts.config.ts',
        '**/hent-openapi-spec.js',
        '**/fpoversiktDtoGenerert.ts',
        '**/fpsoknadDtoGenerert.ts'
    ],
    ignoreBinaries: ['formatjs'],
    ignoreDependencies: [
        ...avhengigheterViVilHaUansett,
        ...avhengigheterRelatertTilTest,
        ...avhenegigheterKnipIkkeForstårBrukes
    ]
};

export default config;
