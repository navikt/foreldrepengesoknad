import { Preview } from '@storybook/react-vite';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import { initialize, mswLoader } from 'msw-storybook-addon';

import { formHookMessages } from '@navikt/fp-form-hooks';
import { arbeidsforholdOgInntektMessages } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { egenNæringMessages } from '@navikt/fp-steg-egen-naering';
import { frilansMessages } from '@navikt/fp-steg-frilans';
import { oppsummeringMessages } from '@navikt/fp-steg-oppsummering';
import { utenlandsoppholdMessages } from '@navikt/fp-steg-utenlandsopphold';
import { uiMessages } from '@navikt/fp-ui';
import { getIntlDecorator, withThemeDecorator } from '@navikt/fp-utils-test';
import { uttaksplanMessages } from '@navikt/fp-uttaksplan';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan-ny';

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
document.head.appendChild(scriptTag);

const withIntlProvider = getIntlDecorator({
    nb: {
        ...nbMessages,
        ...uttaksplanMessages.nb,
        ...nyUttaksplanMessages.nb,
        ...uiMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...oppsummeringMessages.nb,
        ...arbeidsforholdOgInntektMessages.nb,
        ...egenNæringMessages.nb,
        ...frilansMessages.nb,
        ...formHookMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...uttaksplanMessages.nn,
        ...uiMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...oppsummeringMessages.nn,
        ...arbeidsforholdOgInntektMessages.nn,
        ...egenNæringMessages.nn,
        ...frilansMessages.nn,
        ...formHookMessages.nn,
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
    decorators: [withIntlProvider, withThemeDecorator],
    // beforeAll is available in Storybook 8.2. Else the call would happen outside of the preview object
    beforeAll: async () => {
        initialize({
            onUnhandledRequest: 'bypass',
            serviceWorker: {
                url: './mockServiceWorker.js',
            },
        });
    },
    loaders: [mswLoader],
};

//eslint-disable-next-line import/no-default-export
export default preview;
