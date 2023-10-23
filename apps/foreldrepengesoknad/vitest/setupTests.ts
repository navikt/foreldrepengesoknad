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
            LOGIN_URL: 'http://localhost:8888/local/cookie',
            APP_VERSION: 'dev',
            FEATURE_VIS_FEILSIDE: 'on',
            FEATURE_VIS_ALERTSTRIPE: 'off',
        },
    };
});
