import { Preview } from '@storybook/react';

import '@navikt/ds-css';

import { getIntlDecorator } from '@navikt/fp-utils-test';

import enMessages from '../src/i18n/messages/en_US.json';
import nbMessages from '../src/i18n/messages/nb_NO.json';
import nnMessages from '../src/i18n/messages/nn_NO.json';

const withIntlProvider = getIntlDecorator({
    nb: nbMessages,
    nn: nnMessages,
    en: enMessages,
});

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

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
    decorators: [withIntlProvider],
};

export default preview;
