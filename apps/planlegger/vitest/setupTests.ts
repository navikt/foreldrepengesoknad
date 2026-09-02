import { setProjectAnnotations } from '@storybook/react-vite';
import { configure } from '@testing-library/dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

expect.extend(matchers);

// Browser-modus er tregare enn jsdom; auk Testing Library sin standard findBy*/waitFor-timeout.
if (import.meta.env['TEST_MODE'] === 'browser-mode') {
    configure({ asyncUtilTimeout: 10_000 });
}

if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
    Object.assign(globalThis, { scrollTo: () => {} });
    HTMLElement.prototype.scrollIntoView = function () {};

    // Mock ResizeObserver som ikke er tilgjengelig i jsdom, brukes av @radix-ui/react-slider
    Object.assign(globalThis, {
        ResizeObserver: class ResizeObserver {
            observe() {}
            unobserve() {}
            disconnect() {}
        },
    });

    // Mock PointerEvent metoder som ikke er tilgjengelig i jsdom, brukes av @radix-ui/react-slider
    if (!HTMLElement.prototype.hasPointerCapture) {
        HTMLElement.prototype.hasPointerCapture = () => false;
    }
    if (!HTMLElement.prototype.setPointerCapture) {
        HTMLElement.prototype.setPointerCapture = () => {};
    }
    if (!HTMLElement.prototype.releasePointerCapture) {
        HTMLElement.prototype.releasePointerCapture = () => {};
    }
}
