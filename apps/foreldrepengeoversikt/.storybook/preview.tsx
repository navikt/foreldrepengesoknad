import { getIntlDecorator } from '@navikt/fp-utils-test';
import { Preview } from '@storybook/react';
import { allCommonMessages } from '@navikt/fp-common';

import '@navikt/ds-css';
import '../src/app/styles/app.css';

import nbMessages from '../src/app/intl/nb_NO.json';

const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    REST_API_URL: 'test',
    LOGIN_URL: 'test',
});
document.head.appendChild(scriptTag);

const withIntlProvider = getIntlDecorator({
    nb: { ...nbMessages, ...allCommonMessages.nb },
});

const preview: Preview = {
    decorators: [withIntlProvider],
};

export default preview;
