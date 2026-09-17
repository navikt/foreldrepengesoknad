import { setProjectAnnotations } from '@storybook/react-vite';
import '@testing-library/jest-dom/vitest';

import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
    globalThis.scrollTo = () => undefined;
}
