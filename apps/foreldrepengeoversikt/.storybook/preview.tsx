import { Preview } from '@storybook/react-vite';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import { initialize, mswLoader } from 'msw-storybook-addon';

import { filopplasterMessages } from '@navikt/fp-filopplaster';
import { formHookMessages } from '@navikt/fp-form-hooks';
import { observabilityMessages } from '@navikt/fp-observability';
import { uiMessages } from '@navikt/fp-ui';
import { utilsMessages } from '@navikt/fp-utils';
import { getIntlDecorator, withThemeDecorator } from '@navikt/fp-utils-test';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan';

import '../src/index.css';
import enMessages from '../src/intl/messages/en_US.json';
import nbMessages from '../src/intl/messages/nb_NO.json';
import nnMessages from '../src/intl/messages/nn_NO.json';

dayjs.locale('nb');

const withIntlProvider = getIntlDecorator({
    nb: {
        ...nbMessages,
        ...uiMessages.nb,
        ...utilsMessages.nb,
        ...nyUttaksplanMessages.nb,
        ...formHookMessages.nb,
        ...filopplasterMessages.nb,
        ...observabilityMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...uiMessages.nn,
        ...utilsMessages.nn,
        ...nyUttaksplanMessages.nn,
        ...formHookMessages.nn,
        ...filopplasterMessages.nn,
        ...observabilityMessages.nn,
    },
    en: {
        ...enMessages,
        ...uiMessages.en,
        ...utilsMessages.en,
        ...nyUttaksplanMessages.en,
        ...formHookMessages.en,
        ...filopplasterMessages.en,
        ...observabilityMessages.en,
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

initialize({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
        url: './mockServiceWorker.js',
    },
});
const preview: Preview = {
    decorators: [withIntlProvider, withThemeDecorator],
    loaders: [mswLoader],
};

//eslint-disable-next-line import/no-default-export
export default preview;
