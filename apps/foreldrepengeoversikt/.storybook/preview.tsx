import { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';

import '../src/app/index.css';

import { uiMessages } from '@navikt/fp-ui';
import { getIntlDecorator } from '@navikt/fp-utils-test';

import nbMessages from '../src/intl/messages/nb_NO.json';

const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    PUBLIC_PATH: '',
});
document.head.appendChild(scriptTag);

// Initialize MSW
initialize({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
        url: './mockServiceWorker.js',
    },
});

const withIntlProvider = getIntlDecorator({
    nb: { ...nbMessages, ...uiMessages.nb },
});

const preview: Preview = {
    decorators: [withIntlProvider],
    loaders: [mswLoader],
};

export default preview;
