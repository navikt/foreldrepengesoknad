import { Preview } from '@storybook/react';

import '@navikt/ds-css';

import { getIntlDecorator } from '@navikt/fp-utils-test';

import nbMessages from '../src/app/intl/nb_NO.json';
import nnMessages from '../src/app/intl/nn_NO.json';
import '../src/app/styles/app.css';

const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    REST_API_URL: 'rest-api',
    LOGIN_URL: '',
});
document.head.appendChild(scriptTag);

const withIntlProvider = getIntlDecorator({
    nb: nbMessages,
    nn: nnMessages,
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
};

const preview: Preview = {
    decorators: [
        withIntlProvider,
        (Story) => (
            <div id="app" style={{ backgroundColor: 'white', padding: '40px' }}>
                <Story />
            </div>
        ),
    ],
};

export default preview;
