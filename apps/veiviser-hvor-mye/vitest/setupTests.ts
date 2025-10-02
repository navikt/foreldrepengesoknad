import { setProjectAnnotations } from '@storybook/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { beforeAll, expect } from 'vitest';

import * as globalStorybookConfig from '../.storybook/preview';

const annotations = setProjectAnnotations(globalStorybookConfig);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);

expect.extend(matchers);

// @ts-expect-error greit her
if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
    globalThis.scrollTo = () => undefined;
    globalThis.HTMLElement.prototype.scrollIntoView = function () {};
}
