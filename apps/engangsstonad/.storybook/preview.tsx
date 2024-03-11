import { Preview } from '@storybook/react';
import 'styles/globals.css';

import '@navikt/ds-css';

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
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
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
