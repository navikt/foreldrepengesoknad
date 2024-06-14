import { setProjectAnnotations } from '@storybook/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

expect.extend(matchers);

window.scrollTo = () => undefined;
window.HTMLElement.prototype.scrollIntoView = function () {};

vi.mock('./../src/appData/Environment.ts', async () => {
    return {
        default: {
            INNSYN: 'https://foreldrepenger.intern.dev.nav.no',
            PUBLIC_PATH: '',
        },
    };
});
