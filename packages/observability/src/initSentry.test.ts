import * as Sentry from '@sentry/browser';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { initSentry } from './initSentry';

const SENTRY_ERROR_401 = {
    exception: {
        values: [
            {
                type: 'Error',
                value: 'Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.',
                stacktrace: {
                    frames: [
                        {
                            filename:
                                'http://localhost:5173/foreldrepenger/oversikt/node_modules/.vite/deps/react-dom_client.js?v=41b78d6c',
                            function: '?',
                            in_app: true,
                            lineno: 13531,
                            colno: 15,
                        },
                        {
                            filename:
                                'http://localhost:5173/foreldrepenger/oversikt/node_modules/.vite/deps/react-dom_client.js?v=41b78d6c',
                            function: 'processRootScheduleInMicrotask',
                            in_app: true,
                            lineno: 13437,
                            colno: 106,
                        },
                        {
                            filename:
                                'http://localhost:5173/foreldrepenger/oversikt/node_modules/.vite/deps/react-dom_client.js?v=41b78d6c',
                            function: 'flushSyncWorkAcrossRoots_impl',
                            in_app: true,
                            lineno: 13414,
                            colno: 122,
                        },
                        {
                            filename:
                                'http://localhost:5173/foreldrepenger/oversikt/node_modules/.vite/deps/react-dom_client.js?v=41b78d6c',
                            function: 'performSyncWorkOnRoot',
                            in_app: true,
                            lineno: 13517,
                            colno: 9,
                        },
                        {
                            filename:
                                'http://localhost:5173/foreldrepenger/oversikt/node_modules/.vite/deps/react-dom_client.js?v=41b78d6c',
                            function: 'performWorkOnRoot',
                            in_app: true,
                            lineno: 11827,
                            colno: 37,
                        },
                        {
                            filename:
                                'http://localhost:5173/foreldrepenger/oversikt/node_modules/.vite/deps/react-dom_client.js?v=41b78d6c',
                            function: 'renderRootSync',
                            in_app: true,
                            lineno: 12408,
                            colno: 13,
                        },
                        {
                            filename:
                                'http://localhost:5173/foreldrepenger/oversikt/node_modules/.vite/deps/react-dom_client.js?v=41b78d6c',
                            function: 'workLoopSync',
                            in_app: true,
                            lineno: 12424,
                            colno: 43,
                        },
                        {
                            filename:
                                'http://localhost:5173/foreldrepenger/oversikt/node_modules/.vite/deps/react-dom_client.js?v=41b78d6c',
                            function: 'performUnitOfWork',
                            in_app: true,
                            lineno: 12561,
                            colno: 98,
                        },
                        {
                            filename:
                                'http://localhost:5173/foreldrepenger/oversikt/node_modules/.vite/deps/react-dom_client.js?v=41b78d6c',
                            function: 'runWithFiberInDEV',
                            in_app: true,
                            lineno: 997,
                            colno: 72,
                        },
                        {
                            filename:
                                'http://localhost:5173/foreldrepenger/oversikt/node_modules/.vite/deps/react-dom_client.js?v=41b78d6c',
                            function: 'beginWork',
                            in_app: true,
                            lineno: 8525,
                            colno: 20,
                        },
                        {
                            filename:
                                'http://localhost:5173/foreldrepenger/oversikt/node_modules/.vite/deps/react-dom_client.js?v=41b78d6c',
                            function: 'updateFunctionComponent',
                            in_app: true,
                            lineno: 7475,
                            colno: 21,
                        },
                        {
                            filename:
                                'http://localhost:5173/foreldrepenger/oversikt/node_modules/.vite/deps/react-dom_client.js?v=41b78d6c',
                            function: 'renderWithHooks',
                            in_app: true,
                            lineno: 5654,
                            colno: 24,
                        },
                        {
                            filename:
                                'http://localhost:5173/foreldrepenger/oversikt/node_modules/.vite/deps/react-dom_client.js?v=41b78d6c',
                            function: 'Object.react_stack_bottom_frame',
                            in_app: true,
                            lineno: 18509,
                            colno: 20,
                        },
                        {
                            filename:
                                'http://localhost:5173/foreldrepenger/oversikt/src/Foreldrepengeoversikt.tsx?t=1773223525249',
                            function: 'Foreldrepengeoversikt',
                            in_app: true,
                            lineno: 22,
                            colno: 11,
                        },
                    ],
                },
                mechanism: {
                    type: 'generic',
                    handled: true,
                },
            },
        ],
    },
    level: 'error',
    event_id: 'c6da07249df749489f428c8810264179',
    platform: 'javascript',
    request: {
        url: 'https://www.intern.dev.nav.no/foreldrepenger/oversikt/sak/352026978',
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
        },
    },
    timestamp: 1773223654.961,
    environment: 'www.intern.dev.nav.no',
    sdk: {
        integrations: [
            'InboundFilters',
            'FunctionToString',
            'ConversationId',
            'BrowserApiErrors',
            'Breadcrumbs',
            'GlobalHandlers',
            'LinkedErrors',
            'Dedupe',
            'HttpContext',
            'BrowserSession',
        ],
    },
    breadcrumbs: [
        {
            timestamp: 1773223647.153,
            category: 'fetch',
            data: {
                method: 'GET',
                url: 'https://www.intern.dev.nav.no/foreldrepenger/oversikt/fpoversikt/api/person/info-med-arbeidsforhold',
                status_code: 200,
            },
            type: 'http',
        },
        {
            timestamp: 1773223647.153,
            category: 'fetch',
            data: {
                method: 'GET',
                url: 'https://www.intern.dev.nav.no/foreldrepenger/oversikt/fpoversikt/api/oppgaver/tilbakekrevingsuttalelse',
                status_code: 200,
            },
            type: 'http',
        },
        {
            timestamp: 1773223647.156,
            category: 'fetch',
            data: {
                method: 'GET',
                url: 'https://www.intern.dev.nav.no/foreldrepenger/oversikt/fpoversikt/api/saker',
                status_code: 200,
            },
            type: 'http',
        },
        {
            timestamp: 1773223647.292,
            category: 'fetch',
            data: {
                method: 'GET',
                // eslint-disable-next-line max-len
                url: 'https://dekoratoren.ekstern.dev.nav.no/api/ta?context=privatperson&simple=false&simpleHeader=false&redirectToApp=false&level=Level3&language=nb&availableLanguages=%5B%7B%22locale%22%3A%22nb%22%2C%22handleInApp%22%3Atrue%7D%2C%7B%22locale%22%3A%22nn%22%2C%22handleInApp%22%3Atrue%7D%2C%7B%22locale%22%3A%22en%22%2C%22handleInApp%22%3Atrue%7D%5D&breadcrumbs=%5B%5D&utilsBackground=transparent&feedback=false&chatbot=true&chatbotVisible=false&shareScreen=true&logoutWarning=true&redirectOnUserChange=false&analyticsQueryParams=%5B%5D&version-id=1c8de8dedcca53c151b678cf87ef7a42ae08d0b6&consumer=dekoratoren',
                status_code: 200,
            },
            type: 'http',
        },
        {
            timestamp: 1773223647.379,
            category: 'fetch',
            data: {
                method: 'GET',
                url: 'https://www.intern.dev.nav.no/foreldrepenger/oversikt/fpoversikt/api/saker',
                status_code: 200,
            },
            type: 'http',
        },
        {
            timestamp: 1773223654.065,
            category: 'ui.click',
            message: 'body > div#app > div.aksel-theme.light > div.bg-ax-brand-blue-100',
        },
        {
            timestamp: 1773223654.765,
            category: 'ui.click',
            message: 'span.aksel-tag.aksel-tag--xsmall.aksel-body-short.aksel-body-short--small',
        },
        {
            timestamp: 1773223654.766,
            category: 'navigation',
            data: {
                from: '/foreldrepenger/oversikt/',
                to: '/foreldrepenger/oversikt/sak/352026978',
            },
        },
        {
            timestamp: 1773223654.908,
            category: 'fetch',
            data: {
                method: 'GET',
                url: 'https://www.intern.dev.nav.no/foreldrepenger/oversikt/fpoversikt/api/oppgaver/tilbakekrevingsuttalelse',
                status_code: 401,
            },
            type: 'http',
            level: 'warning',
        },
        {
            timestamp: 1773223654.909,
            category: 'fetch',
            data: {
                method: 'GET',
                url: 'https://www.intern.dev.nav.no/foreldrepenger/oversikt/fpoversikt/api/inntektsmeldinger?saksnummer=352026978',
                status_code: 401,
            },
            type: 'http',
            level: 'warning',
        },
        {
            timestamp: 1773223654.909,
            category: 'fetch',
            data: {
                method: 'POST',
                url: 'https://www.intern.dev.nav.no/foreldrepenger/oversikt/fpgrunndata/api/konto',
                status_code: 401,
            },
            type: 'http',
            level: 'warning',
        },
        {
            timestamp: 1773223654.91,
            category: 'fetch',
            data: {
                method: 'GET',
                url: 'https://www.intern.dev.nav.no/foreldrepenger/oversikt/fpoversikt/api/tidslinje?saksnummer=352026978',
                status_code: 401,
            },
            type: 'http',
            level: 'warning',
        },
        {
            timestamp: 1773223654.91,
            category: 'fetch',
            data: {
                method: 'GET',
                url: 'https://www.intern.dev.nav.no/foreldrepenger/oversikt/fpoversikt/api/dokument/alle?saksnummer=352026978',
                status_code: 401,
            },
            type: 'http',
            level: 'warning',
        },
        {
            timestamp: 1773223654.943,
            category: 'fetch',
            data: {
                method: 'GET',
                url: 'https://www.intern.dev.nav.no/foreldrepenger/oversikt/fpoversikt/api/oppgaver/manglendevedlegg?saksnummer=352026978',
                status_code: 401,
            },
            type: 'http',
            level: 'warning',
        },
        {
            timestamp: 1773223654.943,
            category: 'fetch',
            data: {
                method: 'GET',
                url: 'https://www.intern.dev.nav.no/foreldrepenger/oversikt/fpoversikt/api/saker',
                status_code: 401,
            },
            type: 'http',
            level: 'warning',
        },
    ],
    sdkProcessingMetadata: {
        dynamicSamplingContext: {
            environment: 'www.intern.dev.nav.no',
            public_key: 'b4fd4db97e7d4663852a5203961e3cee',
            trace_id: 'dd78a7fe30504c039dd9adff07c731c8',
        },
    },
    contexts: {
        trace: {
            trace_id: 'dd78a7fe30504c039dd9adff07c731c8',
            span_id: 'a7f4e14af2dc17e4',
        },
    },
    type: undefined,
} satisfies Sentry.ErrorEvent;

// Bryr oss ikke om denne, så tillater oss en "as"
const SENTRY_HINT = {} as Sentry.EventHint;

describe('initSentry', () => {
    afterEach(() => {
        const client = Sentry.getClient();
        client?.close();
    });

    it('should filter out errors caused by 401 responses', () => {
        vi.stubGlobal('location', { hostname: 'test.nav.no' });

        initSentry({ dsn: 'https://lokal.test/1' });

        const client = Sentry.getClient();
        const beforeSend = client?.getOptions().beforeSend;

        expect(beforeSend).toBeDefined();

        const result = beforeSend!(SENTRY_ERROR_401, SENTRY_HINT);

        expect(result).toBeNull();
    });
});
