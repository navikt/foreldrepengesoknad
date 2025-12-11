import { setProjectAnnotations } from '@storybook/react-vite';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

expect.extend(matchers);

if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
    globalThis.scrollTo = () => undefined;
}

// Only patch if jsdom provides a ReadableStream without a working cancel()
if (globalThis.ReadableStream) {
    const RS = globalThis.ReadableStream.prototype;

    // jsdom has a cancel(), but it hangs — override anyway
    RS.cancel = function () {
        // ignore original; just settle
        return Promise.resolve();
    };
}
