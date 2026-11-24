import { configure } from '@testing-library/dom';

import { setupStorybookTests } from '@navikt/fp-utils-test/vitest';

import * as globalStorybookConfig from '../.storybook/preview';

setupStorybookTests(globalStorybookConfig, { scrollTo: true, streams: true });

// Browser-modus er tregare enn jsdom; auk Testing Library sin standard findBy*/waitFor-timeout.
if (import.meta.env['TEST_MODE'] === 'browser-mode') {
    configure({ asyncUtilTimeout: 10_000 });
}
