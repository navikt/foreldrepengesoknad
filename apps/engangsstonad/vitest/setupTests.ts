import { setProjectAnnotations } from '@storybook/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { beforeAll, expect } from 'vitest';

import { addBaseUrlToJsdom } from '@navikt/fp-utils-test';

import * as globalStorybookConfig from '../.storybook/preview';

addBaseUrlToJsdom();
const annotations = setProjectAnnotations(globalStorybookConfig);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);

expect.extend(matchers);

window.scrollTo = () => undefined;
