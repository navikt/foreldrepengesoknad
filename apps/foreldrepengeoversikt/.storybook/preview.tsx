import { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';

import '@navikt/ds-css';

import { uiMessages } from '@navikt/fp-ui';
import { getIntlDecorator } from '@navikt/fp-utils-test';

import nbMessages from '../src/app/intl/nb_NO.json';
import '../src/app/styles/app.css';

// Initialize MSW
initialize();

const withIntlProvider = getIntlDecorator({
    nb: { ...nbMessages, ...uiMessages.nb },
});

const preview: Preview = {
    decorators: [withIntlProvider],
    loaders: [mswLoader],
};

export default preview;
