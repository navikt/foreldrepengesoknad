import type { KnipConfig } from 'knip';

// Avhengigheter som ikke brukes overalt per nå. Men som vi ønsker ha tilgjengelig.
const avhengigheterViVilHaUansett = [
    '@navikt/aksel-icons',
    '@navikt/ds-css',
    '@navikt/ds-tailwind',
    '@tailwindcss/vite',
    'tailwindcss',
];

// Usikker på om de med storybook trengs. jsdom og coverage refereres av vitest.
const avhengigheterRelatertTilTest = [
    '@vitest/coverage-v8',
    'jsdom',
    '@storybook/addon-actions',
    '@storybook/cli',
    'playwright',
];

const avhenegigheterKnipIkkeForstårBrukes = [
    '@formatjs/intl-pluralrules',
    '@trivago/prettier-plugin-sort-imports',
    '@sentry/browser',
    'i18n-iso-countries',
];

const config: KnipConfig = {
    ignore: [
        'server/**',
        '**/mock-storage.cjs',
        '**/@types/externals.d.ts',
        '**/bootstrap.tsx',
        'openapi-ts.config.ts',
    ],
    ignoreBinaries: ['prettier', 'formatjs'],
    ignoreDependencies: [
        ...avhengigheterViVilHaUansett,
        ...avhengigheterRelatertTilTest,
        ...avhenegigheterKnipIkkeForstårBrukes,
    ],
};

export default config;
