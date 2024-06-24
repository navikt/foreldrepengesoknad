import { setProjectAnnotations } from '@storybook/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';

import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

expect.extend(matchers);

window.scrollTo = () => undefined;

vi.mock('./../src/appData/Environment.ts', async () => {
    return {
        default: {
            APP_VERSION: 'dev',
        },
    };
});
