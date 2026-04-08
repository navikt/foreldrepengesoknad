import type { KnipConfig } from 'knip';

// Avhengigheter som ikke brukes overalt per nå. Men som vi ønsker ha tilgjengelig.
const avhengigheterViVilHaUansett = [
    '@navikt/aksel-icons',
    '@tailwindcss/vite',
];

// Usikker på om de med storybook trengs. jsdom og coverage refereres av vitest.
const avhengigheterRelatertTilTest = [
    '@vitest/coverage-v8',
    '@storybook/cli',
    'playwright'
];

const avhenegigheterKnipIkkeForstårBrukes = [
    'i18n-iso-countries',
    // Brukes via .husky/pre-commit, men knip oppdager ikke denne bruken
    'lint-staged',
];

const config: KnipConfig = {
    ignore: [
        'server/**',
        '**/fpoversiktDtoGenerert.ts',
        '**/fpsoknadDtoGenerert.ts'
    ],
    ignoreDependencies: [
        ...avhengigheterViVilHaUansett,
        ...avhengigheterRelatertTilTest,
        ...avhenegigheterKnipIkkeForstårBrukes
    ]
};

export default config;
