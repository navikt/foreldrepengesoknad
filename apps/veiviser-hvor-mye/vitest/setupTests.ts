import { setProjectAnnotations } from '@storybook/react-vite';
import { configure } from '@testing-library/dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

expect.extend(matchers);

// Både jsdom og browser kan være trege på CPU-sultne CI-runnere (2 vCPU); øk
// Testing Library sin standard findBy*/waitFor-timeout så steg-overganger rekker å fullføre.
configure({ asyncUtilTimeout: 10000 });

if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
    globalThis.scrollTo = () => undefined;
    globalThis.HTMLElement.prototype.scrollIntoView = function () {};
}
