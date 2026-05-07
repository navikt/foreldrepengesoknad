import { type Context, applyRequestHandlers } from 'msw-storybook-addon';

export const mswWrapper = (
    fn: ({ setHandlers }: { setHandlers: (msw: Context['parameters']['msw']) => void }) => Promise<void> | void,
) => {
    if (import.meta.env['TEST_MODE'] !== 'jsdom-mode' && import.meta.env['TEST_MODE'] !== 'browser-mode') {
        throw new Error('TEST_MODE must be set to either "jsdom-mode" or "browser-mode"');
    }

    // In both jsdom-mode and browser-mode, the msw-storybook-addon's `initialize()` in preview.tsx
    // has already registered the MSW worker (node server in jsdom, service worker in browser).
    // `applyRequestHandlers` communicates with that existing worker via the addon's internal `api`.
    // Creating a separate `setupWorker()` in browser-mode would conflict with the addon's worker.
    return async () => {
        const setHandlers = (msw: Context['parameters']['msw']) => {
            applyRequestHandlers(msw);
        };
        await fn({ setHandlers });
    };
};
