import { HttpResponse, type RequestHandler } from 'msw';
import { setupWorker } from 'msw/browser';
import type { HttpNetworkFrame } from 'msw/experimental';

import { MELLOMLAGRING_NØKKELPREFIKS } from './mockHandlers.ts';

const erHttpFrame = (frame: { protocol: string }): frame is HttpNetworkFrame => frame.protocol === 'http';

const nullstillMellomlagring = () => {
    Object.keys(localStorage)
        .filter((nøkkel) => nøkkel.startsWith(MELLOMLAGRING_NØKKELPREFIKS))
        .forEach((nøkkel) => localStorage.removeItem(nøkkel));

    const url = new URL(location.href);
    url.searchParams.delete('reset');
    history.replaceState(history.state, '', url);
};

export const startMockModus = async (scenarioer: Record<string, RequestHandler[]>): Promise<void> => {
    const søkeparametre = new URLSearchParams(location.search);
    const urlScenario = søkeparametre.get('scenario');

    if (søkeparametre.has('reset')) {
        nullstillMellomlagring();
    }

    if (urlScenario !== null) {
        sessionStorage.setItem('fp-mock-scenario', urlScenario);
    }

    const id: string =
        urlScenario ?? sessionStorage.getItem('fp-mock-scenario') ?? import.meta.env.VITE_SCENARIO ?? 'standard';
    const handlers = Object.hasOwn(scenarioer, id) ? scenarioer[id] : undefined;

    if (!handlers) {
        sessionStorage.removeItem('fp-mock-scenario');
        throw new Error(`Ukjent scenario "${id}". Gyldige scenarioer: ${Object.keys(scenarioer).join(', ')}`);
    }

    document.documentElement.dataset.mockScenario = id;

    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const worker = setupWorker(...handlers);

    await worker.start({
        quiet: true,
        serviceWorker: {
            url: `${base}/mockServiceWorker.js`,
            options: { scope: `${base}/` },
        },
        // Kall til appens backend-API uten handler skal feile. Alt annet, som dekoratøren og Vite-moduler, slippes gjennom.
        onUnhandledFrame: ({ frame, defaults }) => {
            if (!erHttpFrame(frame)) {
                return;
            }

            const { origin, pathname } = new URL(frame.data.request.url);
            const erBackendKall =
                origin === location.origin &&
                pathname.startsWith(base) &&
                /^\/fp[a-z]+\/api\//.test(pathname.slice(base.length));

            if (erBackendKall) {
                defaults.error();
                // defaults.error() logger bare i MSW 3, uten å stoppe kallet.
                frame.respondWith(HttpResponse.error());
            }
        },
    });
};
