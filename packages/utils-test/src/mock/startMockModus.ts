import { HttpResponse, type RequestHandler, http } from 'msw';
import { setupWorker } from 'msw/browser';

export type MockScenario = {
    beskrivelse: string;
    /** Tekst som bare vises når scenarioet er lastet riktig. */
    kjennetegn: string;
    handlers: RequestHandler[];
};

export const startMockModus = async (scenarioer: Record<string, MockScenario>): Promise<void> => {
    const urlScenario = new URLSearchParams(location.search).get('scenario');

    if (urlScenario !== null) {
        sessionStorage.setItem('fp-mock-scenario', urlScenario);
    }

    const id = urlScenario ?? sessionStorage.getItem('fp-mock-scenario') ?? 'standard';
    const scenario = Object.hasOwn(scenarioer, id) ? scenarioer[id] : undefined;

    if (!scenario) {
        sessionStorage.removeItem('fp-mock-scenario');
        throw new Error(`Ukjent scenario "${id}". Gyldige scenarioer: ${Object.keys(scenarioer).join(', ')}`);
    }

    document.documentElement.dataset.mockScenario = id;

    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    // Backend-kall uten handler skal feile i stedet for å gå videre til Vite.
    const avvisUmockedeBackendKall = http.all(`${base}/:tjeneste/api/*`, ({ params }) =>
        String(params.tjeneste).startsWith('fp') ? HttpResponse.error() : undefined,
    );

    await setupWorker(...scenario.handlers, avvisUmockedeBackendKall).start({
        quiet: true,
        onUnhandledFrame: 'bypass',
        serviceWorker: {
            url: `${base}/mockServiceWorker.js`,
            options: { scope: `${base}/` },
        },
    });
};
