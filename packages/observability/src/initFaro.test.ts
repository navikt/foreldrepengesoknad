import { init } from '@nais/apm';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { initFaro } from './initFaro';

vi.mock('@nais/apm', () => ({
    init: vi.fn(),
}));

const APP = { name: 'engangsstonad', namespace: 'teamforeldrepenger' };
const TOM_META = {};

type ExceptionItem = {
    type: 'exception';
    payload: {
        timestamp: string;
        type: string;
        value: string;
        stacktrace?: {
            frames?: Array<{ filename?: string; function?: string }>;
        };
    };
    meta: Record<string, unknown>;
};

describe('initFaro', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
        vi.unstubAllGlobals();
        vi.clearAllMocks();
    });

    describe('init-kall', () => {
        it('setter opp @nais/apm med app/navnrom/version og beforeSend', () => {
            vi.stubEnv('VITE_SENTRY_RELEASE', '1.2.3');
            vi.stubGlobal('location', { href: 'https://www.nav.no/foreldrepenger/soknad' });

            initFaro({ app: APP });

            expect(init).toHaveBeenCalledTimes(1);
            expect(init).toHaveBeenCalledWith(
                expect.objectContaining({
                    app: APP.name,
                    namespace: APP.namespace,
                    version: '1.2.3',
                    beforeSend: expect.any(Function),
                    faro: expect.objectContaining({
                        metas: expect.any(Array),
                    }),
                }),
            );
        });

        it('hopper over initialisering i development-modus', () => {
            vi.stubEnv('MODE', 'development');

            initFaro({ app: APP });

            expect(init).not.toHaveBeenCalled();
        });
    });

    describe('beforeSend – 401-filter (feilVarSomFølgeAvEn401Handling)', () => {
        it('beholder exceptions uten 401-relatert innhold', () => {
            vi.stubGlobal('location', { href: 'https://www.nav.no/foreldrepenger/soknad' });
            initFaro({ app: APP });

            const beforeSend = hentBeforeSend();

            const exceptionItem = lagExceptionItem({
                type: 'TypeError',
                value: 'Cannot read properties of undefined',
            });

            const resultat = beforeSend(exceptionItem);
            expect(resultat).toBe(exceptionItem);
        });

        it.each([
            { beskrivelse: '"401" i value', type: 'HTTPError', value: 'HTTP 401 Unauthorized' },
            { beskrivelse: '"401" i type', type: 'Error 401', value: 'Noe gikk galt' },
            { beskrivelse: '"Unauthorized" i value', type: 'Error', value: 'Unauthorized' },
        ])('filtrerer bort exception med $beskrivelse', ({ type, value }) => {
            vi.stubGlobal('location', { href: 'https://www.nav.no/foreldrepenger/soknad' });
            initFaro({ app: APP });

            const beforeSend = hentBeforeSend();

            const exceptionItem = lagExceptionItem({ type, value });

            const resultat = beforeSend(exceptionItem);
            expect(resultat).toBeNull();
        });

        it('slipper gjennom andre event-typer (log, trace, etc)', () => {
            vi.stubGlobal('location', { href: 'https://www.nav.no/foreldrepenger/soknad' });
            initFaro({ app: APP });

            const beforeSend = hentBeforeSend();

            const logItem = {
                type: 'log',
                payload: { message: 'Hei', level: 'info' },
                meta: TOM_META,
            };

            const resultat = beforeSend(logItem);
            expect(resultat).toBe(logItem);
        });
    });

    describe('beforeSend – dekoratør-filter (feilUtenOpprinnelseIVårKode)', () => {
        it('filtrerer bort feil som bare har stackframes fra dekoratøren', () => {
            vi.stubGlobal('location', { href: 'https://www.nav.no/foreldrepenger/soknad' });
            initFaro({ app: APP });

            const beforeSend = hentBeforeSend();

            const exceptionItem = lagExceptionItem({
                type: 'TypeError',
                value: 'Cannot read properties of null',
                stacktrace: {
                    frames: [
                        {
                            filename:
                                'https://www.nav.no/foreldrepenger/soknad/assets/personbruker/decorator-next-CdDeSDeS.js',
                            function: 'render',
                        },
                        {
                            filename:
                                'https://www.nav.no/foreldrepenger/soknad/assets/personbruker/decorator-next-CdDeSDeS.js',
                            function: 'createComponent',
                        },
                    ],
                },
            });

            const resultat = beforeSend(exceptionItem);
            expect(resultat).toBeNull();
        });

        it('beholder feil med stackframes fra vår kode', () => {
            vi.stubGlobal('location', { href: 'https://www.nav.no/foreldrepenger/soknad' });
            initFaro({ app: APP });

            const beforeSend = hentBeforeSend();

            const exceptionItem = lagExceptionItem({
                type: 'TypeError',
                value: 'Cannot read properties of null',
                stacktrace: {
                    frames: [
                        {
                            filename: 'https://www.nav.no/foreldrepenger/soknad/assets/index-BmDeSDeS.js',
                            function: 'Foreldrepengeoversikt',
                        },
                    ],
                },
            });

            const resultat = beforeSend(exceptionItem);
            expect(resultat).toBe(exceptionItem);
        });
    });

    describe('beforeSend – nettleserutvidelse-filter (feilFraBrowserExtensions)', () => {
        it('filtrerer bort Request timeout *Distributor.getValue', () => {
            vi.stubGlobal('location', { href: 'https://www.nav.no/foreldrepenger/soknad' });
            initFaro({ app: APP });

            const beforeSend = hentBeforeSend();

            const exceptionItem = lagExceptionItem({
                type: 'UnhandledRejection',
                value: 'Non-Error promise rejection captured with value: Request timeout appSettingsDistributor.getValue',
            });

            const resultat = beforeSend(exceptionItem);
            expect(resultat).toBeNull();
        });

        it('filtrerer bort Distributor-feil via stacktrace', () => {
            vi.stubGlobal('location', { href: 'https://www.nav.no/foreldrepenger/soknad' });
            initFaro({ app: APP });

            const beforeSend = hentBeforeSend();

            const exceptionItem = lagExceptionItem({
                type: 'UnhandledRejection',
                value: 'Non-Error promise rejection',
                stacktrace: {
                    frames: [
                        {
                            filename: 'Request timeout speechVoicesDistributor.getValue',
                            function: '?',
                        },
                    ],
                },
            });

            const resultat = beforeSend(exceptionItem);
            expect(resultat).toBeNull();
        });

        it('beholder vanlige feil', () => {
            vi.stubGlobal('location', { href: 'https://www.nav.no/foreldrepenger/soknad' });
            initFaro({ app: APP });

            const beforeSend = hentBeforeSend();

            const exceptionItem = lagExceptionItem({
                type: 'Error',
                value: 'Vanlig feil i applikasjonen',
            });

            const resultat = beforeSend(exceptionItem);
            expect(resultat).toBe(exceptionItem);
        });
    });

    describe('beforeSend – støyfilter (dom-oversettelse og hasFocus)', () => {
        it('filtrerer bort removeChild/insertBefore-feil fra oversettelsesverktøy', () => {
            vi.stubGlobal('location', { href: 'https://www.nav.no/foreldrepenger/soknad' });
            initFaro({ app: APP });

            const beforeSend = hentBeforeSend();

            const exceptionItem = lagExceptionItem({
                type: 'NotFoundError',
                value: "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.",
            });

            const resultat = beforeSend(exceptionItem);
            expect(resultat).toBeNull();
        });

        it('filtrerer bort hasFocus-feil injisert av browser/webview', () => {
            vi.stubGlobal('location', { href: 'https://www.nav.no/foreldrepenger/soknad' });
            initFaro({ app: APP });

            const beforeSend = hentBeforeSend();

            const exceptionItem = lagExceptionItem({
                type: 'TypeError',
                value: "window.hasFocus is not a function. (In 'window.hasFocus()', 'window.hasFocus' is undefined)",
            });

            const resultat = beforeSend(exceptionItem);
            expect(resultat).toBeNull();
        });

        it('beholder legitime hasFocus-feil fra vår egen kode', () => {
            vi.stubGlobal('location', { href: 'https://www.nav.no/foreldrepenger/soknad' });
            initFaro({ app: APP });

            const beforeSend = hentBeforeSend();

            const exceptionItem = lagExceptionItem({
                type: 'TypeError',
                value: 'fokusHaandterer.hasFocus is not a function',
            });

            const resultat = beforeSend(exceptionItem);
            expect(resultat).toBe(exceptionItem);
        });
    });
});

function hentBeforeSend() {
    const config = vi.mocked(init).mock.calls[0]?.[0];
    expect(config?.beforeSend).toBeDefined();
    return config!.beforeSend! as (item: unknown) => unknown;
}

function lagExceptionItem({
    type,
    value,
    stacktrace,
}: {
    type: string;
    value: string;
    stacktrace?: ExceptionItem['payload']['stacktrace'];
}): ExceptionItem {
    return {
        type: 'exception',
        payload: {
            timestamp: new Date().toISOString(),
            type,
            value,
            stacktrace,
        },
        meta: TOM_META,
    };
}
