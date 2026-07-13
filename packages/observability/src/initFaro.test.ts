import {
    type ExceptionEvent,
    type Meta,
    type TransportItem,
    TransportItemType,
    getWebInstrumentations,
    initializeFaro,
} from '@grafana/faro-web-sdk';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { initFaro } from './initFaro';

vi.mock('@grafana/faro-web-sdk', () => ({
    initializeFaro: vi.fn(),
    getWebInstrumentations: vi.fn(() => []),
    TransportItemType: {
        EXCEPTION: 'exception',
        LOG: 'log',
        MEASUREMENT: 'measurement',
        TRACE: 'trace',
        EVENT: 'event',
    },
}));

const APP = { name: 'engangsstonad', namespace: 'teamforeldrepenger' };
const TOM_META = {} as Meta;

describe('initFaro', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
        vi.unstubAllGlobals();
        vi.clearAllMocks();
    });

    describe('kollektor-URL', () => {
        it('bruker prod-collector i prod-miljø (www.nav.no)', () => {
            vi.stubEnv('VITE_SENTRY_RELEASE', '1.2.3');
            vi.stubGlobal('location', { hostname: 'www.nav.no' });

            initFaro({ app: APP });

            expect(initializeFaro).toHaveBeenCalledTimes(1);
            expect(getWebInstrumentations).toHaveBeenCalled();
            expect(initializeFaro).toHaveBeenCalledWith(
                expect.objectContaining({
                    url: 'https://telemetry.nav.no/collect',
                    app: { ...APP, version: '1.2.3' },
                    paused: false,
                }),
            );
        });

        it('bruker dev-collector i dev-miljø (www.intern.dev.nav.no)', () => {
            vi.stubGlobal('location', { hostname: 'www.intern.dev.nav.no' });

            initFaro({ app: APP });

            expect(initializeFaro).toHaveBeenCalledWith(
                expect.objectContaining({
                    url: 'https://telemetry.ekstern.dev.nav.no/collect',
                    paused: false,
                }),
            );
        });

        it('pauser telemetri på localhost', () => {
            vi.stubGlobal('location', { hostname: 'localhost' });

            initFaro({ app: APP });

            expect(initializeFaro).toHaveBeenCalledWith(expect.objectContaining({ paused: true }));
        });

        it('hopper over initialisering i development-modus', () => {
            vi.stubEnv('MODE', 'development');
            vi.stubGlobal('location', { hostname: 'localhost' });

            initFaro({ app: APP });

            expect(initializeFaro).not.toHaveBeenCalled();
        });
    });

    describe('beforeSend – 401-filter (feilVarSomFølgeAvEn401Handling)', () => {
        it('beholder exceptions uten 401-relatert innhold', () => {
            vi.stubGlobal('location', { hostname: 'www.nav.no' });
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
            vi.stubGlobal('location', { hostname: 'www.nav.no' });
            initFaro({ app: APP });

            const beforeSend = hentBeforeSend();

            const exceptionItem = lagExceptionItem({ type, value });

            const resultat = beforeSend(exceptionItem);
            expect(resultat).toBeNull();
        });

        it('slipper gjennom andre event-typer (log, trace, etc)', () => {
            vi.stubGlobal('location', { hostname: 'www.nav.no' });
            initFaro({ app: APP });

            const beforeSend = hentBeforeSend();

            const logItem = {
                type: TransportItemType.LOG,
                payload: { message: 'Hei', level: 'info' },
                meta: TOM_META,
            };

            const resultat = beforeSend(logItem as unknown as TransportItem<ExceptionEvent>);
            expect(resultat).toBe(logItem);
        });
    });

    describe('beforeSend – dekoratør-filter (feilUtenOpprinnelseIVårKode)', () => {
        it('filtrerer bort feil som bare har stackframes fra dekoratøren', () => {
            vi.stubGlobal('location', { hostname: 'www.nav.no' });
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
            vi.stubGlobal('location', { hostname: 'www.nav.no' });
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
            vi.stubGlobal('location', { hostname: 'www.nav.no' });
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
            vi.stubGlobal('location', { hostname: 'www.nav.no' });
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
            vi.stubGlobal('location', { hostname: 'www.nav.no' });
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
            vi.stubGlobal('location', { hostname: 'www.nav.no' });
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
            vi.stubGlobal('location', { hostname: 'www.nav.no' });
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
            vi.stubGlobal('location', { hostname: 'www.nav.no' });
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
    const config = vi.mocked(initializeFaro).mock.calls[0]?.[0];
    expect(config?.beforeSend).toBeDefined();
    return config!.beforeSend!;
}

function lagExceptionItem({
    type,
    value,
    stacktrace,
}: {
    type: string;
    value: string;
    stacktrace?: ExceptionEvent['stacktrace'];
}): TransportItem<ExceptionEvent> {
    return {
        type: TransportItemType.EXCEPTION,
        payload: {
            timestamp: new Date().toISOString(),
            type,
            value,
            stacktrace,
        },
        meta: TOM_META,
    };
}
