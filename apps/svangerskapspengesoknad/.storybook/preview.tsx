import { Preview } from '@storybook/react';

import '@navikt/ds-css';

import { oppsummeringMessages } from '@navikt/fp-oppsummering';
import { uiMessages } from '@navikt/fp-ui';
import { utenlandsoppholdMessages } from '@navikt/fp-utenlandsopphold';
import { getIntlDecorator } from '@navikt/fp-utils-test';

import nbMessages from '../src/app/intl/nb_NO.json';
import nnMessages from '../src/app/intl/nn_NO.json';
import '../src/app/styles/app.css';

const withIntlProvider = getIntlDecorator({
    nb: { ...nbMessages, ...uiMessages.nb, ...utenlandsoppholdMessages.nb, ...oppsummeringMessages.nb },
    nn: { ...nnMessages, ...uiMessages.nn, ...utenlandsoppholdMessages.nn, ...oppsummeringMessages.nn },
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
            <div id="app" style={{ backgroundColor: 'white', padding: '40px' }}>
                <Story />
            </div>
        ),
    ],
};

export default preview;
