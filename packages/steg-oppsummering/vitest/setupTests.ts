import { setupStorybookTests } from '@navikt/fp-utils-test/vitest';

import * as globalStorybookConfig from '../.storybook/preview';

setupStorybookTests(globalStorybookConfig, { scrollTo: true });
