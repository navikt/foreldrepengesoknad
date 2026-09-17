import { setProjectAnnotations } from '@storybook/react-vite';
import '@testing-library/jest-dom/vitest';

import * as globalStorybookConfig from '../.storybook/preview';

setProjectAnnotations(globalStorybookConfig);

if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
    globalThis.scrollTo = () => undefined;

    if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
        globalThis.scrollTo = () => undefined;

        if (globalThis.ReadableStream) {
            const RS = globalThis.ReadableStream.prototype;

            // Denne var tricky å finne ut av. Den feiler ikke i jsdom, men den blir stående å vente/henge på et eller annet uvisst.
            // Resolver den derfor umiddelbart. Det er oppførsel (retries, opploadprogress, etc.) som ikke er relevant å teste i jsdom.
            // Om det i fremtiden skal testes bør det skje i ekte browser - ikke jsdom
            RS.cancel = function () {
                return Promise.resolve();
            };
        }
    }
}
