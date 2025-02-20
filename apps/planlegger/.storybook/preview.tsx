import { Preview } from '@storybook/react';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import { initialize, mswLoader } from 'msw-storybook-addon';

import '@navikt/ds-css';

import { uiMessages } from '@navikt/fp-ui';
import { getIntlDecorator } from '@navikt/fp-utils-test';
import { uttaksplanKalenderMessages } from '@navikt/fp-uttaksplan-kalender-ny';
import { nyUttaksplanMessages } from '@navikt/fp-uttaksplan-ny';

import enMessages from '../src/intl/messages/en_US.json';
import nbMessages from '../src/intl/messages/nb_NO.json';
import nnMessages from '../src/intl/messages/nn_NO.json';
import '../src/styles/global.css';

const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    APPRES_CMS_URL: '',
});
document.head.appendChild(scriptTag);

dayjs.locale('nb');

const withIntlProvider = getIntlDecorator({
    nb: { ...nbMessages, ...uiMessages.nb, ...uttaksplanKalenderMessages.nb, ...nyUttaksplanMessages.nb },
    nn: { ...nnMessages, ...uiMessages.nn, ...uttaksplanKalenderMessages.nn, ...nyUttaksplanMessages.nn },
    en: { ...enMessages, ...uiMessages.en, ...uttaksplanKalenderMessages.en },
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
    decorators: [
        withIntlProvider,
        (Story, context) => {
            if (context.componentId.includes('components-')) {
                return <Story />;
            }

            return (
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 50px)' }}>
                    <div style={{ backgroundColor: '#AC7976' }}>--- Nav Header (Placeholder) ---</div>
                    <div id="app">
                        <Story />
                    </div>
                    <div style={{ backgroundColor: '#AC7976' }}>--- Nav Footer (Placeholder) ---</div>
                </div>
            );
        },
    ],
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
