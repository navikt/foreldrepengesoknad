import type { KnipConfig } from 'knip';

const config: KnipConfig = {
    ignore: ['server/**'], //bootstrap files
    ignoreBinaries: ['docker-compose'],
    ignoreDependencies: [
        "@navikt/ds-css",
        "@navikt/ds-tailwind",
        "@tailwindcss/vite",
        "@storybook/addon-actions",
        "@storybook/cli",
        "tailwindcss",
        "playwright"
    ],
};

export default config;
