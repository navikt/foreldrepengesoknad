import { setProjectAnnotations } from '@storybook/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

expect.extend(matchers);

// @ts-expect-error greit her
if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
    window.scrollTo = () => undefined;
}
