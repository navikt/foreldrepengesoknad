import { setProjectAnnotations } from '@storybook/react-vite';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/vitest';

import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

// Browser-modus er tregare enn jsdom; auk Testing Library sin standard findBy*/waitFor-timeout.
if (import.meta.env['TEST_MODE'] === 'browser-mode') {
    configure({ asyncUtilTimeout: 10_000 });
}

if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
    Object.assign(globalThis, { scrollTo: () => {} });
    HTMLElement.prototype.scrollIntoView = function () {};
}
