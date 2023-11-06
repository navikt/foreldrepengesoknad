import { expect, vi } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { Modal } from '@navikt/ds-react';

import { setProjectAnnotations } from '@storybook/react';
import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

expect.extend(matchers);

window.scrollTo = () => undefined;

if (Modal.setAppElement) {
    Modal.setAppElement('body');
}

vi.mock('./../src/appData/Environment.ts', async () => {
    return {
        default: {
            REST_API_URL: 'http://localhost:8888/rest',
            LOGIN_URL: 'http://localhost:8888/local/cookie',
            APP_VERSION: 'dev',
        },
    };
});
