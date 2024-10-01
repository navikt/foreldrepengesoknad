import { setProjectAnnotations } from '@storybook/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { beforeAll, expect, vi } from 'vitest';

import * as globalStorybookConfig from '../.storybook/preview';

const annotations = setProjectAnnotations(globalStorybookConfig);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);

expect.extend(matchers);

window.scrollTo = () => undefined;

vi.mock('./../src/app/Environment.ts', async () => {
    return {
        default: {
            APP_VERSION: 'dev',
            PUBLIC_PATH: '',
        },
    };
});
