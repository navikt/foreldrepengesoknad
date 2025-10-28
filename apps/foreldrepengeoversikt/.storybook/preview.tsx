import { Preview } from '@storybook/react-vite';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import { initialize, mswLoader } from 'msw-storybook-addon';

import { formHookMessages } from '@navikt/fp-form-hooks';
import { uiMessages } from '@navikt/fp-ui';
import { utilsMessages } from '@navikt/fp-utils';
import { getIntlDecorator, withThemeDecorator } from '@navikt/fp-utils-test';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan-ny';

import '../src/index.css';
import nbMessages from '../src/intl/messages/nb_NO.json';

dayjs.locale('nb');

const withIntlProvider = getIntlDecorator({
    nb: {
        ...nbMessages,
        ...uiMessages.nb,
        ...utilsMessages.nb,
        ...nyUttaksplanMessages.nb,
        ...formHookMessages.nb,
    },
});

export const globalTypes = {
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
