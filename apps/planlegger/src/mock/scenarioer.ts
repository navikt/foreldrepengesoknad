import type { RequestHandler } from 'msw';

import { fpgrunndataHandlers } from '@navikt/fp-config-vite/mockModus/mockHandlers.ts';

import scenarioMeta from './scenarioer.json' with { type: 'json' };

const urlPrefiks = import.meta.env.BASE_URL;

export const scenarioer = {
    standard: fpgrunndataHandlers(urlPrefiks),
} satisfies Record<keyof typeof scenarioMeta, RequestHandler[]>;
