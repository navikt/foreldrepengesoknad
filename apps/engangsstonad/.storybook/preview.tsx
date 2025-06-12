import { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';
import 'styles/globals.css';

import { formHookMessages } from '@navikt/fp-form-hooks';
import { oppsummeringMessages } from '@navikt/fp-steg-oppsummering';
import { utenlandsoppholdMessages } from '@navikt/fp-steg-utenlandsopphold';
import { uiMessages } from '@navikt/fp-ui';
import { getIntlDecorator } from '@navikt/fp-utils-test';

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
    },
    nn: {
        ...nnMessages,
        ...uiMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...oppsummeringMessages.nn,
        ...formHookMessages.nn,
    },
    en: {
        ...enMessages,
        ...uiMessages.en,
        ...utenlandsoppholdMessages.en,
        ...oppsummeringMessages.en,
        ...formHookMessages.en,
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
};

const preview: Preview = {
    decorators: [withIntlProvider],
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

export default preview;
