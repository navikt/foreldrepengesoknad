import { setProjectAnnotations } from '@storybook/react-vite';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

expect.extend(matchers);

if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
    globalThis.scrollTo = () => undefined;
    globalThis.HTMLElement.prototype.scrollIntoView = function () {};

    // Mock ResizeObserver som ikke er tilgjengelig i jsdom, brukes av @radix-ui/react-slider
    globalThis.ResizeObserver = class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    };

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
