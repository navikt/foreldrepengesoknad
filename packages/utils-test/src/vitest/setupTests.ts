import { setProjectAnnotations } from '@storybook/react-vite';
import '@testing-library/jest-dom/vitest';

type TestOptions = {
    scrollTo?: boolean;
    streams?: boolean;
};

export const setupStorybookTests = (
    preview: Parameters<typeof setProjectAnnotations>[0],
    { scrollTo = false, streams = false }: TestOptions = {},
) => {
    setProjectAnnotations(preview);

    if (import.meta.env['TEST_MODE'] !== 'jsdom-mode') {
        return;
    }

    if (scrollTo) {
        globalThis.scrollTo = () => undefined;
    }

    if (streams) {
        if (globalThis.ReadableStream) {
            // jsdom can leave stream cancellation pending indefinitely.
            globalThis.ReadableStream.prototype.cancel = function () {
                return Promise.resolve();
            };
        }

        if (globalThis.Blob && !globalThis.Blob.prototype.stream) {
            globalThis.Blob.prototype.stream = function () {
                return new ReadableStream({
                    start: async (controller) => {
                        controller.enqueue(await this.bytes());
                        controller.close();
                    },
                });
            };
        }
    }
};
