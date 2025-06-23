import { setProjectAnnotations } from '@storybook/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { beforeAll, expect } from 'vitest';

import * as globalStorybookConfig from '../.storybook/preview';

const annotations = setProjectAnnotations(globalStorybookConfig);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);

dayjs.extend(isSameOrAfter);

expect.extend(matchers);

// @ts-expect-error greit her
if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
    window.scrollTo = () => undefined;
}
