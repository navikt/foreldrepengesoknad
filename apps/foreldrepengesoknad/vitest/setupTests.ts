import { setProjectAnnotations } from '@storybook/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { beforeAll, expect } from 'vitest';

import { addBaseUrlToJsdom } from '@navikt/fp-utils-test';

import * as globalStorybookConfig from '../.storybook/preview';

addBaseUrlToJsdom();
const annotations = setProjectAnnotations(globalStorybookConfig);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);

dayjs.extend(isSameOrAfter);

expect.extend(matchers);

window.scrollTo = () => undefined;
