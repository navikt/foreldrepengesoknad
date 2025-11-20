import { type Context, applyRequestHandlers } from 'msw-storybook-addon';
import { setupWorker } from 'msw/browser';

export const mswWrapper = (
    fn: ({ setHandlers }: { setHandlers: (msw: Context['parameters']['msw']) => void }) => Promise<void>,
) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TEST_MODE is set in vitest config
    if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
        return async () => {
            const setHandlers = (msw: Context['parameters']['msw']) => {
                applyRequestHandlers(msw);
            };
            await fn({ setHandlers });
        };
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TEST_MODE is set in vitest config
    if (import.meta.env['TEST_MODE'] !== 'browser-mode') {
        throw new Error('TEST_MODE must be set to either "jsdom-mode" or "browser-mode"');
    }

    const worker = setupWorker();

    return async () => {
        await worker.start();
        const setHandlers = (msw: Context['parameters']['msw']) => {
            // @ts-expect-error Usikker på kva som er greia her
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            worker.use(...msw.handlers);
        };

        try {
            await fn({ setHandlers });
        } finally {
            worker.resetHandlers();
        }
    };
};
