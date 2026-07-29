import { setProjectAnnotations } from '@storybook/react-vite';
import { configure } from '@testing-library/dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

expect.extend(matchers);

// Browser-modus er tregare enn jsdom; auk Testing Library sin standard findBy*/waitFor-timeout.
if (import.meta.env['TEST_MODE'] === 'browser-mode') {
    configure({ asyncUtilTimeout: 10000 });
}

if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
    globalThis.scrollTo = () => undefined;
    globalThis.HTMLElement.prototype.scrollIntoView = function () {};
}
