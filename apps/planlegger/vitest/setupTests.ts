import { configure } from '@testing-library/dom';

import { setupStorybookTests } from '@navikt/fp-utils-test/vitest';

import * as globalStorybookConfig from '../.storybook/preview';

vi.mock(import('@navikt/nav-dekoratoren-moduler'), async (importOriginal) => ({
    ...(await importOriginal()),
    setAvailableLanguages: vi.fn(),
    onLanguageSelect: vi.fn(),
}));

setupStorybookTests(globalStorybookConfig, { scrollTo: true });

// Browser-modus er tregare enn jsdom; auk Testing Library sin standard findBy*/waitFor-timeout.
if (import.meta.env['TEST_MODE'] === 'browser-mode') {
    configure({ asyncUtilTimeout: 10_000 });
}

if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
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
