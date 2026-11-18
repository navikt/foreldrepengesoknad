import { startMockModus } from '@navikt/fp-config-vite/mockModus/startMockModus.ts';

import { scenarioer } from './scenarioer.ts';

export const startMock = () => startMockModus(scenarioer);
