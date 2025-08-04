import type { KnipConfig } from 'knip';

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
        '@navikt/aksel-icons',
        '@navikt/ds-css',
        '@navikt/ds-tailwind',
        '@tailwindcss/vite',
        '@storybook/addon-actions',
        '@storybook/cli',
        'tailwindcss',
        'playwright',
        '@formatjs/intl-pluralrules',
        '@trivago/prettier-plugin-sort-imports',
        '@sentry/browser',
        'i18n-iso-countries',
    ],
};

export default config;
