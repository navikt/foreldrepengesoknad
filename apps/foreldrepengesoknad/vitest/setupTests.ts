import { expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { setProjectAnnotations } from '@storybook/react';
import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

dayjs.extend(isSameOrAfter);

expect.extend(matchers);

window.scrollTo = () => undefined;

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
