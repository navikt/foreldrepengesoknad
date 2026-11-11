import { configure } from '@testing-library/dom';

import { setupStorybookTests } from '@navikt/fp-utils-test/vitest';

import * as globalStorybookConfig from '../.storybook/preview';

// Preview lastes før testfilene, så mocken i AppContainer.test.tsx kom for sent.
vi.mock(import('@navikt/nav-dekoratoren-moduler'), () => ({
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
}
