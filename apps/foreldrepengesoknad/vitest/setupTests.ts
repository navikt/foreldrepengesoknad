import { setProjectAnnotations } from '@storybook/react-vite';
import * as matchers from '@testing-library/jest-dom/matchers';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { expect } from 'vitest';

import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

dayjs.extend(isSameOrAfter);

expect.extend(matchers);

if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
    globalThis.scrollTo = () => undefined;
}
