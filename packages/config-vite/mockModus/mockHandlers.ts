import { HttpResponse, type RequestHandler, http } from 'msw';

export const MELLOMLAGRING_NØKKELPREFIKS = 'fp-mock-mellomlagring:';

const FPGRUNNDATA_DEV = 'https://fpgrunnlag.ekstern.dev.nav.no/fpgrunndata/api';

const nøkkel = (url: string) => `${MELLOMLAGRING_NØKKELPREFIKS}${document.documentElement.dataset.mockScenario}:${url}`;

/**
 * Mellomlagring i localStorage, separat per scenario. `startdata` brukes til søknaden er lagret eller slettet første gang.
 * `?reset` i URL-en tømmer all mellomlagring.
 */
export const mellomlagringHandlers = (url: string, startdata?: unknown): RequestHandler[] => [
    http.get(url, () => {
        const lagret = localStorage.getItem(nøkkel(url));
        const data = lagret === null ? startdata : JSON.parse(lagret);
        return data === undefined || data === null ? new HttpResponse(null, { status: 204 }) : HttpResponse.json(data);
    }),
    http.post(url, async ({ request }) => {
        localStorage.setItem(nøkkel(url), await request.text());
        return new HttpResponse(null, { status: 200 });
    }),
    http.delete(url, () => {
        localStorage.setItem(nøkkel(url), 'null');
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
