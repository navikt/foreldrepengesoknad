import type { KnipConfig } from 'knip';

const config: KnipConfig = {
    ignore: [
        'server/**',
        '**/mock-storage.cjs',
        '**/@types/externals.d.ts',
        '**/bootstrap.tsx',
        'openapi-ts.config.ts',
    ], //bootstrap files, mock-storage
    ignoreBinaries: ['prettier', 'formatjs'],
    ignoreDependencies: [
        '@navikt/aksel-icons',
        '@navikt/ds-css',
        '@navikt/ds-tailwind',
        '@tailwindcss/vite',
        '@storybook/addon-actions',
        '@storybook/cli',
        'tailwindcss',
        'playwright',
        '@formatjs/intl-pluralrules',
        '@sentry/browser', // Finn ut hvorfor denne fjernes i veiviser
        'i18n-iso-countries', // Finn ut hvorfor denne fjernes i svp
    ],
};

export default config;
