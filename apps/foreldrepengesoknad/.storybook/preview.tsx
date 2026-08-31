import { Preview } from '@storybook/react-vite';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import { mswLoader } from 'msw-storybook-addon/csf3';
import type { SetupWorker } from 'msw/browser';

import { filopplasterMessages } from '@navikt/fp-filopplaster';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { arbeidsforholdOgInntektMessages } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { egenNæringMessages } from '@navikt/fp-steg-egen-naering';
import { frilansMessages } from '@navikt/fp-steg-frilans';
import { oppsummeringMessages } from '@navikt/fp-steg-oppsummering';
import { utenlandsoppholdMessages } from '@navikt/fp-steg-utenlandsopphold';
import { uiMessages } from '@navikt/fp-ui';
import { getIntlDecorator, withThemeDecorator } from '@navikt/fp-utils-test';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan';

import '../src/index.css';
import nbMessages from '../src/intl/nb_NO.json';
import nnMessages from '../src/intl/nn_NO.json';
import '../src/styles/app.css';

dayjs.locale('nb');

const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    APP_VERSION: 'test',
});
document.head.append(scriptTag);

const withIntlProvider = getIntlDecorator({
    nb: {
        ...nbMessages,
        ...nyUttaksplanMessages.nb,
        ...uiMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...oppsummeringMessages.nb,
        ...arbeidsforholdOgInntektMessages.nb,
        ...egenNæringMessages.nb,
        ...frilansMessages.nb,
        ...formHookMessages.nb,
        ...filopplasterMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...nyUttaksplanMessages.nn,
        ...uiMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...oppsummeringMessages.nn,
        ...arbeidsforholdOgInntektMessages.nn,
        ...egenNæringMessages.nn,
        ...frilansMessages.nn,
        ...formHookMessages.nn,
        ...filopplasterMessages.nn,
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
