import { Preview } from '@storybook/react-vite';
import { mswLoader } from 'msw-storybook-addon/csf3';
import type { SetupWorker } from 'msw/browser';
import 'styles/globals.css';

import { filopplasterMessages } from '@navikt/fp-filopplaster';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { oppsummeringMessages } from '@navikt/fp-steg-oppsummering';
import { utenlandsoppholdMessages } from '@navikt/fp-steg-utenlandsopphold';
import { uiMessages } from '@navikt/fp-ui';
import { getIntlDecorator, withThemeDecorator } from '@navikt/fp-utils-test';

import '../src/index.css';
import enMessages from '../src/intl/messages/en_US.json';
import nbMessages from '../src/intl/messages/nb_NO.json';
import nnMessages from '../src/intl/messages/nn_NO.json';

const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    APP_VERSION: 'test',
    INNSYN: 'test',
});
document.head.appendChild(scriptTag);

const withIntlProvider = getIntlDecorator({
    nb: {
        ...nbMessages,
        ...uiMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...oppsummeringMessages.nb,
        ...formHookMessages.nb,
        ...filopplasterMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...uiMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...oppsummeringMessages.nn,
        ...formHookMessages.nn,
        ...filopplasterMessages.nn,
    },
    en: {
        ...enMessages,
        ...uiMessages.en,
        ...utenlandsoppholdMessages.en,
        ...oppsummeringMessages.en,
        ...formHookMessages.en,
        ...filopplasterMessages.en,
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
    decorators: [withIntlProvider, withThemeDecorator],
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
