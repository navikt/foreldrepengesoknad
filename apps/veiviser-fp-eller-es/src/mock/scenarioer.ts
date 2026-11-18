import type { RequestHandler } from 'msw';

import scenarioMeta from './scenarioer.json' with { type: 'json' };

export const scenarioer = {
    standard: [],
} satisfies Record<keyof typeof scenarioMeta, RequestHandler[]>;
