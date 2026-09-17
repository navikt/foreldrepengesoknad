import { Preview } from '@storybook/react-vite';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import { mswLoader } from 'msw-storybook-addon/csf3';
import type { SetupWorker } from 'msw/browser';

import { filopplasterMessages } from '@navikt/fp-filopplaster';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { observabilityMessages } from '@navikt/fp-observability';
import { uiMessages } from '@navikt/fp-ui';
import { utilsMessages } from '@navikt/fp-utils';
import { getIntlDecorator, withThemeDecorator } from '@navikt/fp-utils-test';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan';

import '../src/index.css';
import enMessages from '../src/intl/messages/en_US.json';
import nbMessages from '../src/intl/messages/nb_NO.json';
import nnMessages from '../src/intl/messages/nn_NO.json';

dayjs.locale('nb');

const withIntlProvider = getIntlDecorator({
    nb: {
        ...nbMessages,
        ...uiMessages.nb,
        ...utilsMessages.nb,
        ...nyUttaksplanMessages.nb,
        ...formHookMessages.nb,
        ...filopplasterMessages.nb,
        ...observabilityMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...uiMessages.nn,
        ...utilsMessages.nn,
        ...nyUttaksplanMessages.nn,
        ...formHookMessages.nn,
        ...filopplasterMessages.nn,
        ...observabilityMessages.nn,
    },
    en: {
        ...enMessages,
        ...uiMessages.en,
        ...utilsMessages.en,
        ...nyUttaksplanMessages.en,
        ...formHookMessages.en,
        ...filopplasterMessages.en,
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
        (Story) => (
            // index.html har eit <main id="app">-element som pakkar inn heile appen i drift.
            // Simuler det same her slik at axe-testane ikkje slår ut på ei mangel som ikkje finst i drift.
            <main id="app">
                <Story />
            </main>
        ),
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
