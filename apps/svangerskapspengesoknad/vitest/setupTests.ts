import { expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { setProjectAnnotations } from '@storybook/react';
import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

expect.extend(matchers);

window.scrollTo = () => undefined;

vi.mock('./../src/app/Environment.ts', async () => {
    return {
        default: {
            REST_API_URL: 'rest-api',
            LOGIN_URL: '',
            INNSYN: 'https://foreldrepenger.intern.dev.nav.no',
        },
    };
});
