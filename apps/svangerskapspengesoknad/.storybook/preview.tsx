import { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';

import { filopplasterMessages } from '@navikt/fp-filopplaster';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { arbeidsforholdOgInntektMessages } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { egenNæringMessages } from '@navikt/fp-steg-egen-naering';
import { frilansMessages } from '@navikt/fp-steg-frilans';
import { oppsummeringMessages } from '@navikt/fp-steg-oppsummering';
import { utenlandsoppholdMessages } from '@navikt/fp-steg-utenlandsopphold';
import { uiMessages } from '@navikt/fp-ui';
import { getIntlDecorator, withThemeDecorator } from '@navikt/fp-utils-test';

import '../src/index.css';
import nbMessages from '../src/intl/nb_NO.json';
import nnMessages from '../src/intl/nn_NO.json';
import '../src/styles/app.css';

const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    LOG_VALIDATION: 'test',
    INNSYN: 'test',
});
document.head.appendChild(scriptTag);

const withIntlProvider = getIntlDecorator({
    nb: {
        ...nbMessages,
        ...uiMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...oppsummeringMessages.nb,
        ...frilansMessages.nb,
        ...egenNæringMessages.nb,
        ...arbeidsforholdOgInntektMessages.nb,
        ...formHookMessages.nb,
        ...filopplasterMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...uiMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...oppsummeringMessages.nn,
        ...frilansMessages.nn,
        ...egenNæringMessages.nn,
        ...arbeidsforholdOgInntektMessages.nn,
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
