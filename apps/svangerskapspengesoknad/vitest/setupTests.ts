import { expect, vi } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { Modal } from '@navikt/ds-react';

expect.extend(matchers);

window.scrollTo = () => undefined;

if (Modal.setAppElement) {
    Modal.setAppElement('body');
}

vi.mock('./../src/app/Environment.ts', async () => {
    return {
        default: {
            REST_API_URL: 'rest-api',
            LOGIN_URL: '',
        },
    };
});
