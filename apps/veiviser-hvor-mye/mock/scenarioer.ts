import type { RequestHandler } from 'msw';

import { fpgrunndataHandlers } from '@navikt/fp-utils-test/mock';

import scenarioMeta from './scenarioer.json' with { type: 'json' };

const urlPrefiks = import.meta.env.BASE_URL;

export const scenarioer = {
    standard: fpgrunndataHandlers(urlPrefiks),
} satisfies Record<keyof typeof scenarioMeta, RequestHandler[]>;
