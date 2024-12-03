import type { Config } from 'tailwindcss';

import dsTailwind from '@navikt/ds-tailwind';

export default {
    presets: [dsTailwind],
    content: ['./src/**'],
} satisfies Config;
