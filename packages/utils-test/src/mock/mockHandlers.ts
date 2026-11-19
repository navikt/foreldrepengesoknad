import { HttpResponse, type RequestHandler, http } from 'msw';

const FPGRUNNDATA_DEV = 'https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api';

const nøkkel = (url: string) => `fp-mock-mellomlagring:${document.documentElement.dataset.mockScenario}:${url}`;

/**
 * Mellomlagring i sessionStorage, separat per scenario. `startdata` brukes til søknaden er lagret eller slettet første gang.
 */
export const mellomlagringHandlers = (url: string, startdata?: unknown): RequestHandler[] => [
    http.get(url, () => {
        const lagret = sessionStorage.getItem(nøkkel(url)) ?? JSON.stringify(startdata ?? null);
        return lagret === 'null'
            ? new HttpResponse(null, { status: 204 })
            : new HttpResponse(lagret, { headers: { 'content-type': 'application/json' } });
    }),
    http.post(url, async ({ request }) => {
        sessionStorage.setItem(nøkkel(url), await request.text());
        return new HttpResponse(null, { status: 200 });
    }),
    http.delete(url, () => {
        sessionStorage.setItem(nøkkel(url), 'null');
        return new HttpResponse(null, { status: 200 });
    }),
];

/** Sender fpgrunndata-kall til den åpne dev-tjenesten, slik at kvoter og satser beregnes som i dev. */
export const fpgrunndataHandlers = (urlPrefiks: string): RequestHandler[] => [
    http.all(`${urlPrefiks}/fpgrunndata/api/*`, async ({ request }) => {
        const sti = new URL(request.url).pathname.split('/fpgrunndata/api')[1];
        const respons = await fetch(`${FPGRUNNDATA_DEV}${sti}`, {
            method: request.method,
            headers: { 'content-type': 'application/json' },
            body: request.method === 'GET' ? undefined : await request.text(),
        });
        return new HttpResponse(await respons.text(), {
            status: respons.status,
            headers: { 'content-type': respons.headers.get('content-type') ?? 'application/json' },
        });
    }),
];
