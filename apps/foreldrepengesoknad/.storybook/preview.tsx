import { getIntlDecorator } from '@navikt/fp-utils-test';
import { Preview } from '@storybook/react';
import { allCommonMessages } from '@navikt/fp-common';

import '../src/app/styles/app.less';

import nnMessages from '../src/app/intl/nn_NO.json';
import nbMessages from '../src/app/intl/nb_NO.json';

const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    REST_API_URL: 'test',
    LOGIN_URL: 'test',
    APP_VERSION: 'test',
    FEATURE_VIS_FEILSIDE: 'off',
    FEATURE_VIS_ALERTSTRIPE: 'on',
});
document.head.appendChild(scriptTag);

const withIntlProvider = getIntlDecorator({
    nb: { ...nbMessages, ...allCommonMessages.nb },
    nn: { ...nnMessages, ...allCommonMessages.nn },
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
