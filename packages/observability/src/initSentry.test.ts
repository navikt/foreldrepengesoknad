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

const BROWSER_EXTENSION_SPEECH_ASSIST = {
    event_id: '7014f5e5901c47008426382f982fd4a0',
    release: 'foreldrepengesoknad-2026.03.12.160920-2cffb14',
    platform: 'javascript',
    message: '',
    breadcrumbs: [
        {
            timestamp: 1773347007.142,
            type: 'http',
            category: 'fetch',
            level: 'info',
            data: {
                method: 'GET',
                status_code: 200,
                url: '[Filtered]',
            },
        },
        {
            timestamp: 1773347007.142,
            type: 'http',
            category: 'fetch',
            level: 'info',
            data: {
                method: 'GET',
                status_code: 200,
                // eslint-disable-next-line max-len
                url: 'https://www.nav.no/dekoratoren/main-menu?context=privatperson&simple=false&simpleHeader=false&redirectToApp=false&level=Level3&language=nb&availableLanguages=%5B%5D&breadcrumbs=%5B%5D&utilsBackground=transparent&feedback=false&chatbot=true&chatbotVisible=false&shareScreen=true&logoutWarning=true&redirectOnUserChange=false&analyticsQueryParams=%5B%5D&version-id=1c8de8dedcca53c151b678cf87ef7a42ae08d0b6&consumer=dekoratoren',
            },
        },
        {
            timestamp: 1773347007.142,
            type: 'http',
            category: 'fetch',
            level: 'info',
            data: {
                method: 'GET',
                status_code: 200,
                // eslint-disable-next-line max-len
                url: 'https://www.nav.no/dekoratoren/ops-messages?context=privatperson&simple=false&simpleHeader=false&redirectToApp=false&level=Level3&language=nb&availableLanguages=%5B%5D&breadcrumbs=%5B%5D&utilsBackground=transparent&feedback=false&chatbot=true&chatbotVisible=false&shareScreen=true&logoutWarning=true&redirectOnUserChange=false&analyticsQueryParams=%5B%5D&version-id=1c8de8dedcca53c151b678cf87ef7a42ae08d0b6&consumer=dekoratoren',
            },
        },
        {
            timestamp: 1773347007.143,
            type: 'http',
            category: 'fetch',
            level: 'info',
            data: {
                method: 'GET',
                status_code: 200,
                url: '[Filtered]',
            },
        },
        {
            timestamp: 1773347007.174,
            type: 'http',
            category: 'fetch',
            level: 'info',
            data: {
                method: 'GET',
                status_code: 200,
                url: 'https://www.nav.no/foreldrepenger/soknad/fpoversikt/api/saker',
            },
        },
        {
            timestamp: 1773347007.256,
            type: 'http',
            category: 'fetch',
            level: 'info',
            data: {
                method: 'GET',
                status_code: 200,
                url: 'https://www.nav.no/foreldrepenger/soknad/fpsoknad/api/storage/FORELDREPENGER',
            },
        },
        {
            timestamp: 1773347007.54,
            type: 'http',
            category: 'fetch',
            level: 'info',
            data: {
                method: 'GET',
                status_code: 200,
                url: 'https://www.nav.no/foreldrepenger/soknad/fpoversikt/api/person/info-med-arbeidsforhold',
            },
        },
        {
            timestamp: 1773347007.56,
            type: 'default',
            category: 'navigation',
            level: 'info',
            data: {
                from: '/foreldrepenger/soknad/',
                to: '/foreldrepenger/soknad/plan',
            },
        },
        {
            timestamp: 1773347007.638,
            type: 'http',
            category: 'fetch',
            level: 'info',
            data: {
                method: 'POST',
                status_code: 204,
                url: 'https://www.nav.no/foreldrepenger/soknad/fpoversikt/api/annenPart',
            },
        },
        {
            timestamp: 1773347007.654,
            type: 'http',
            category: 'fetch',
            level: 'info',
            data: {
                method: 'POST',
                status_code: 200,
                url: 'https://www.nav.no/foreldrepenger/soknad/fpgrunndata/api/konto',
            },
        },
        {
            timestamp: 1773347017.184,
            type: 'default',
            category: 'ui.click',
            level: 'info',
            message: 'button.aksel-button.aksel-button--medium[type="button"] \u003E span.aksel-label',
        },
        {
            timestamp: 1773347021.366,
            type: 'default',
            category: 'ui.click',
            level: 'info',
            message: 'button.aksel-date__field-button[type="button"] \u003E svg',
        },
        {
            timestamp: 1773347022.128,
            type: 'default',
            category: 'sentry.event',
            level: 'error',
            message:
                'UnhandledRejection: Non-Error promise rejection captured with value: Request timeout appSettingsDistributor.getValue',
            event_id: 'd3d9cba3998e49c6a81164f7ceac540d',
        },
        {
            timestamp: 1773347022.129,
            type: 'default',
            category: 'sentry.event',
            level: 'error',
            message:
                'UnhandledRejection: Non-Error promise rejection captured with value: Request timeout lettersVoicesDistributor.getValue',
            event_id: 'a091f9ab47ca40999d4392a914496957',
        },
        {
            timestamp: 1773347022.131,
            type: 'default',
            category: 'sentry.event',
            level: 'error',
            message:
                'UnhandledRejection: Non-Error promise rejection captured with value: Request timeout dictionariesDistributor.getValue',
            event_id: '201c451a388d4e3e9f18bd500e0af15c',
        },
        {
            timestamp: 1773347022.132,
            type: 'default',
            category: 'sentry.event',
            level: 'error',
            message:
                'UnhandledRejection: Non-Error promise rejection captured with value: Request timeout availableLanguagesDistributor.getValue',
            event_id: '6b29b5196f724a8d9ff3f378898b9b2e',
        },
        {
            timestamp: 1773347022.133,
            type: 'default',
            category: 'sentry.event',
            level: 'error',
            message:
                'UnhandledRejection: Non-Error promise rejection captured with value: Request timeout availableTextCheckLanguagesDistributor.getValue',
            event_id: '77122e4b52554ef1abc5f627b62664a2',
        },
        {
            timestamp: 1773347022.134,
            type: 'default',
            category: 'sentry.event',
            level: 'error',
            message:
                'UnhandledRejection: Non-Error promise rejection captured with value: Request timeout getDictionariesByLanguageId',
            event_id: '8803e61786284851901e6bab447ef50a',
        },
        {
            timestamp: 1773347022.135,
            type: 'default',
            category: 'sentry.event',
            level: 'error',
            message:
                'UnhandledRejection: Non-Error promise rejection captured with value: Request timeout dictateStateDistributor.getValue',
            event_id: 'b52a6ba0f78d413eb6e3ecc0bc244be3',
        },
        {
            timestamp: 1773347022.136,
            type: 'default',
            category: 'sentry.event',
            level: 'error',
            message:
                'UnhandledRejection: Non-Error promise rejection captured with value: Request timeout predictionDistributor.getValue',
            event_id: '1beebd7e4b914240aa8a2950ffc17fa8',
        },
        {
            timestamp: 1773347022.137,
            type: 'default',
            category: 'sentry.event',
            level: 'error',
            message:
                'UnhandledRejection: Non-Error promise rejection captured with value: Request timeout isMathOcrAvailable',
            event_id: '4ab902e78bb84de2ac20a48e08f3367f',
        },
        {
            timestamp: 1773347022.138,
            type: 'default',
            category: 'sentry.event',
            level: 'error',
            message:
                'UnhandledRejection: Non-Error promise rejection captured with value: Request timeout isPredictionAvailable',
            event_id: '40860fd6fab74b51aa17c7f97d052916',
        },
        {
            timestamp: 1773347022.139,
            type: 'default',
            category: 'sentry.event',
            level: 'error',
            message:
                'UnhandledRejection: Non-Error promise rejection captured with value: Request timeout isDictateAvailable',
            event_id: 'b2fbbfba4db5425595b82dc3321897fa',
        },
        {
            timestamp: 1773347022.14,
            type: 'default',
            category: 'sentry.event',
            level: 'error',
            message:
                'UnhandledRejection: Non-Error promise rejection captured with value: Request timeout speechVoicesDistributor.getValue',
            event_id: 'c3821c391cab423fa9adf361433320f3',
        },
        {
            timestamp: 1773347022.141,
            type: 'default',
            category: 'sentry.event',
            level: 'error',
            message:
                'UnhandledRejection: Non-Error promise rejection captured with value: Request timeout userDistributor.getValue',
            event_id: '082f61d113ca4225ae584ad69709a2e1',
        },
        {
            timestamp: 1773347022.141,
            type: 'default',
            category: 'sentry.event',
            level: 'error',
            message:
                'UnhandledRejection: Non-Error promise rejection captured with value: Request timeout DefineExpirationForLanguagePacks.getValue',
            event_id: '953ae352aacc4bc4acb206ff38e6553e',
        },
        {
            timestamp: 1773347022.142,
            type: 'default',
            category: 'sentry.event',
            level: 'error',
            message:
                'UnhandledRejection: Non-Error promise rejection captured with value: Request timeout appSettingsDistributor.getValue',
            event_id: '057055558d094ca99dee55aeb6784d28',
        },
    ],

    contexts: {
        browser: {
            name: 'Edge',
            version: '145.0.0',
            type: 'browser',
        },
        os: {
            name: 'Windows',
            version: '\u003E=10',
            type: 'os',
        },
        trace: {
            trace_id: 'f7f93e1763fb4ad19723ab305ff171e4',
            span_id: 'b3c48584bda17682',
            status: 'unknown',
            type: 'trace',
        },
    },
    environment: 'www.nav.no',
    exception: {
        values: [
            {
                type: 'UnhandledRejection',
                value: 'Non-Error promise rejection captured with value: Request timeout lettersVoicesDistributor.getValue',
                mechanism: {
                    type: 'auto.browser.global_handlers.onunhandledrejection',
                    handled: false,
                },
            },
        ],
    },
    fingerprint: ['{{ default }}'],
    level: 'error',
    logger: '',
    sdk: {
        name: 'sentry.javascript.browser',
        version: '10.38.0',
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
        packages: [
            {
                name: 'npm:@sentry/browser',
                version: '10.38.0',
            },
        ],
    },
    timestamp: 1773347022.143,
    user: {
        ip_address: null,
        sentry_user: 'ip:35.191.53.254',
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

    it('should filter out errors caused by browser extensions like speech assist', () => {
        vi.stubGlobal('location', { hostname: 'test.nav.no' });

        initSentry({ dsn: 'https://lokal.test/1' });

        const client = Sentry.getClient();
        const beforeSend = client?.getOptions().beforeSend;

        expect(beforeSend).toBeDefined();

        const result = beforeSend!(BROWSER_EXTENSION_SPEECH_ASSIST, SENTRY_HINT);

        expect(result).toBeNull();
    });
});
