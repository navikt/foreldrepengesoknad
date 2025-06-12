import { type Context, applyRequestHandlers } from 'msw-storybook-addon';
import { SetupWorkerApi, setupWorker } from 'msw/browser';
import { test } from 'vitest';

// Legg til MSW-handlers via applyRequestHandlers når en bruker jsdsom og msw-oppsett via storybook
// Legg til MSW-handlers via setupWorker når en bruker vitest browsermode

//https://mswjs.io/docs/recipes/vitest-browser-mode/

let worker: SetupWorkerApi;

if (import.meta.env['TEST_MODE'] === 'browser-mode') {
    worker = setupWorker() as SetupWorkerApi;
}

// eslint-disable-next-line vitest/valid-title, vitest/expect-expect
export const mswTest = test.extend<{ setHandlers: (msw: Context['parameters']['msw']) => void }>({
    setHandlers: [
        // eslint-disable-next-line no-empty-pattern
        async ({}, use) => {
            if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
                await use((msw: Context['parameters']['msw']) => applyRequestHandlers(msw));
            } else if (import.meta.env['TEST_MODE'] === 'browser-mode' && worker) {
                // Start the worker before the test.
                await worker.start();

                // Expose the worker object on the test's context.
                // @ts-expect-error Usikker på kva som er greia her
                await use((msw: Context['parameters']['msw']) => (msw ? worker.use(...msw.handlers) : undefined));

                // Remove any request handlers added in individual test cases.
                // This prevents them from affecting unrelated tests.
                worker.resetHandlers();
            } else {
                throw new Error('TEST_MODE must be set to either "jsdom-mode" or "browser-mode"');
            }
        },
        {
            auto: true,
        },
    ],
});
