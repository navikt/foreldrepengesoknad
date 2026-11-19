import { startMockModus } from '@navikt/fp-utils-test/mock';

import { scenarioer } from './scenarioer.ts';

export const startMock = () => startMockModus(scenarioer);
