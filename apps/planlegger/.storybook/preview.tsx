import { Preview } from '@storybook/react-vite';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import { mswLoader } from 'msw-storybook-addon/csf3';
import type { SetupWorker } from 'msw/browser';

import { formHookMessages } from '@navikt/fp-form-hooks';
import { observabilityMessages } from '@navikt/fp-observability';
import { uiMessages } from '@navikt/fp-ui';
import { getIntlDecorator, withThemeDecorator } from '@navikt/fp-utils-test';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan';

import '../src/index.css';
import enMessages from '../src/intl/messages/en_US.json';
import nbMessages from '../src/intl/messages/nb_NO.json';
import nnMessages from '../src/intl/messages/nn_NO.json';
import '../src/styles/global.css';

const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    APPRES_CMS_URL: '',
});
document.head.appendChild(scriptTag);

dayjs.locale('nb');

const withIntlProvider = getIntlDecorator({
    nb: {
        ...nbMessages,
        ...uiMessages.nb,
        ...nyUttaksplanMessages.nb,
        ...formHookMessages.nb,
        ...observabilityMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...uiMessages.nn,
        ...nyUttaksplanMessages.nn,
        ...formHookMessages.nn,
        ...observabilityMessages.nn,
    },
    en: {
        ...enMessages,
        ...uiMessages.en,
        ...nyUttaksplanMessages.en,
        ...formHookMessages.en,
        ...observabilityMessages.en,
    },
});

export const globalTypes = {
    locale: {
        description: 'Internationalization locale',
        toolbar: {
            title: 'Språk',
            icon: 'globe',
            items: [
                { value: 'nb', title: 'Bokmål' },
                { value: 'nn', title: 'Nynorsk' },
                { value: 'en', title: 'English' },
            ],
            dynamicTitle: true,
        },
    },
    theme: {
        name: 'Tema',
        description: 'Aksel tema',
        defaultValue: 'light',
        toolbar: {
            icon: 'circlehollow',
            items: [
                { value: 'light', icon: 'circlehollow', title: 'Lys' },
                { value: 'dark', icon: 'circle', title: 'Mørk' },
            ],
            showName: true,
        },
    },
};

const preview: Preview = {
    parameters: {
        // a11y-addonen viser tilgjengelegheitsbrot i eit eige panel i Storybook UI-et, til lokal DX-feedback.
        // Han er ikkje ein CI-gate (best-practice-regler på isolerte komponentar gir mykje støy) - sjå
        // packages/utils-test/src/a11y/uuTest.ts for den faktiske a11y-testinga i CI.
        a11y: { test: 'todo' },
    },
    decorators: [
        withIntlProvider,
        withThemeDecorator,
        (Story, context) => {
            if (context.componentId.includes('components-')) {
                return <Story />;
            }

            return (
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 50px)' }}>
                    {/* Nav-dekoratøren rendrar reelle header/footer-landemerke i produksjon; simuler det
                        same her slik at axe-testane ikkje slår ut på mangel som ikkje finst i drift. */}
                    <header style={{ backgroundColor: '#AC7976' }}>--- Nav Header (Placeholder) ---</header>
                    <div id="app">
                        <Story />
                    </div>
                    <footer style={{ backgroundColor: '#AC7976' }}>--- Nav Footer (Placeholder) ---</footer>
                </div>
            );
        },
    ],
    loaders: [
        mswLoader(async () => {
            // jsdom-testene har ingen service worker; bruk msw/node-server der.
            // I nettleseren (Storybook og browser-mode-tester) bruker vi service worker.
            if (import.meta.env['TEST_MODE'] === 'jsdom-mode') {
                const { setupServer } = await import('msw/node');
                const server = setupServer();
                server.listen({ onUnhandledRequest: 'bypass' });
                return server as unknown as SetupWorker;
            }

            const { setupWorker } = await import('msw/browser');
            const worker = setupWorker();
            await worker.start({
                onUnhandledRequest: 'bypass',
                serviceWorker: {
                    url: './mockServiceWorker.js',
                },
            });
            return worker;
        }),
    ],
};

//eslint-disable-next-line import-x/no-default-export
export default preview;
