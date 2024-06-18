import { Preview } from '@storybook/react';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';

import '@navikt/ds-css';

import { allCommonMessages } from '@navikt/fp-common';
import { oppsummeringMessages } from '@navikt/fp-oppsummering';
import { IntlProvider, uiMessages } from '@navikt/fp-ui';
import { utenlandsoppholdMessages } from '@navikt/fp-utenlandsopphold';
import { getIntlDecorator } from '@navikt/fp-utils-test';

import nbMessages from '../src/app/intl/nb_NO.json';
import nnMessages from '../src/app/intl/nn_NO.json';
import '../src/app/styles/app.less';

dayjs.locale('nb');

const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    APP_VERSION: 'test',
    FEATURE_VIS_FEILSIDE: 'off',
    FEATURE_VIS_ALERTSTRIPE: 'on',
});
document.head.appendChild(scriptTag);

const withIntlProvider = getIntlDecorator({
    nb: {
        ...nbMessages,
        ...allCommonMessages.nb,
        ...uiMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...oppsummeringMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...allCommonMessages.nn,
        ...uiMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...oppsummeringMessages.nn,
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
            ],
            dynamicTitle: true,
        },
    },
};

const preview: Preview = {
    decorators: [
        withIntlProvider,
        (Story) => (
            <div id="app" style={{ padding: '40px' }}>
                <Story />
            </div>
        ),
    ],
};

export default preview;
