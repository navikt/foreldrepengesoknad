import { configure } from '@testing-library/dom';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import { setupStorybookTests } from '@navikt/fp-utils-test/vitest';

import * as globalStorybookConfig from '../.storybook/preview';

vi.mock(import('@navikt/nav-dekoratoren-moduler'), () => ({
    setAvailableLanguages: vi.fn(),
    onLanguageSelect: vi.fn(),
}));

setupStorybookTests(globalStorybookConfig, { scrollTo: true, streams: true });

dayjs.extend(isSameOrAfter);

// Browser-modus er tregare enn jsdom; auk Testing Library sin standard findBy*/waitFor-timeout.
if (import.meta.env['TEST_MODE'] === 'browser-mode') {
    configure({ asyncUtilTimeout: 10_000 });
}
