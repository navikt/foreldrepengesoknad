import { Preview } from '@storybook/react';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import { initialize, mswLoader } from 'msw-storybook-addon';

import { uiMessages } from '@navikt/fp-ui';
import { getIntlDecorator } from '@navikt/fp-utils-test';

import '../src/index.css';
import nbMessages from '../src/intl/messages/nb_NO.json';

dayjs.locale('nb');

const withIntlProvider = getIntlDecorator({
    nb: { ...nbMessages, ...uiMessages.nb },
});

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
