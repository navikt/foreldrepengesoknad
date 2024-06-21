import { setProjectAnnotations } from '@storybook/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { expect, vi } from 'vitest';

import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

dayjs.extend(isSameOrAfter);

expect.extend(matchers);

window.scrollTo = () => undefined;

vi.mock('./../src/app/Environment.ts', async () => {
    return {
        default: {
            APP_VERSION: 'dev',
        },
    };
});
