import { HttpResponse, type RequestHandler } from 'msw';
import { setupWorker } from 'msw/browser';

export const startMockModus = async (scenarioer: Record<string, RequestHandler[]>): Promise<void> => {
    const urlScenario = new URLSearchParams(location.search).get('scenario');

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

    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const worker = setupWorker(...handlers);

    await worker.start({
        quiet: true,
        serviceWorker: {
            url: `${base}/mockServiceWorker.js`,
            options: { scope: `${base}/` },
        },
        // Kall til appens backend-API uten handler skal feile. Alt annet, som dekoratøren og Vite-moduler, slippes gjennom.
        onUnhandledFrame: async ({ frame, defaults }) => {
            if (frame.protocol !== 'http') {
                return;
            }

            const { origin, pathname } = new URL((frame.data as { request: Request }).request.url);
            const erBackendKall =
                origin === location.origin &&
                pathname.startsWith(base) &&
                /^\/fp[a-z]+\/api\//.test(pathname.slice(base.length));

            if (erBackendKall) {
                await defaults.error();
                // defaults.error() logger bare i MSW 3. En kastet Response gir nettverksfeil i stedet for å sende kallet videre.
                throw HttpResponse.error();
            }
        },
    });

    document.documentElement.dataset.mockScenario = id;
    console.info(`[mock] Scenario: ${id}`);
};
