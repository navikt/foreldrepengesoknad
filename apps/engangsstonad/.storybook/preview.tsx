import { Preview } from '@storybook/react';
import 'styles/globals.css';

import '@navikt/ds-css';

import { oppsummeringMessages } from '@navikt/fp-oppsummering';
import { uiMessages } from '@navikt/fp-ui';
import { utenlandsoppholdMessages } from '@navikt/fp-utenlandsopphold';
import { getIntlDecorator } from '@navikt/fp-utils-test';

import enMessages from '../src/intl/messages/en_US.json';
import nbMessages from '../src/intl/messages/nb_NO.json';
import nnMessages from '../src/intl/messages/nn_NO.json';

const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    REST_API_URL: '',
});
document.head.appendChild(scriptTag);

const withIntlProvider = getIntlDecorator({
    nb: { ...nbMessages, ...uiMessages.nb, ...utenlandsoppholdMessages.nb, ...oppsummeringMessages.nb },
    nn: { ...nnMessages, ...uiMessages.nn, ...utenlandsoppholdMessages.nn, ...oppsummeringMessages.nn },
    en: { ...enMessages, ...uiMessages.en, ...utenlandsoppholdMessages.en, ...oppsummeringMessages.en },
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
};

export default preview;
