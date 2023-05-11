import { expect, vi } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { Modal } from '@navikt/ds-react';

dayjs.extend(isSameOrAfter);

expect.extend(matchers);

window.scrollTo = () => undefined;

if (Modal.setAppElement) {
    Modal.setAppElement('body');
}

vi.mock('./../src/app/Environment.ts', async () => {
    return {
        default: {
            REST_API_URL: 'http://localhost:8888/rest',
            UTTAK_API_URL: 'uttak-url',
            LOGIN_URL: 'http://localhost:8888/local/cookie',
            APP_VERSION: 'dev',
            FAMILIE: 'https://familie.dev.nav.no',
            FEATURE_VIS_FEILSIDE: 'off',
            FEATURE_VIS_ALERTSTRIPE: 'on',
            FEATURE_VIS_PERIODER_SOM_SENDES_INN: 'on',
            FEATURE_WLB_GJELDER_FRA_FORSTE_JAN: 'off',
        },
    };
});
