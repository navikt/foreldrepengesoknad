import { Preview } from '@storybook/react';

import '@navikt/ds-css';

import { getIntlDecorator } from '@navikt/fp-utils-test';

import nbMessages from '../src/app/intl/nb_NO.json';
import '../src/app/styles/app.css';

const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    REST_API_URL: 'test',
    LOGIN_URL: 'test',
});
document.head.appendChild(scriptTag);

const withIntlProvider = getIntlDecorator({
    nb: nbMessages,
});

const preview: Preview = {
    decorators: [withIntlProvider],
};

export default preview;
