import { Preview } from '@storybook/react';

import { getIntlDecorator } from '@navikt/fp-utils-test';

import nbMessages from '../src/intl/nb_NO.json';
import nnMessages from '../src/intl/nn_NO.json';
import './index.css';

const withIntlProvider = getIntlDecorator({
    nb: nbMessages,
    nn: nnMessages,
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
            ],
            dynamicTitle: true,
        },
    },
};

const preview: Preview = {
    decorators: [withIntlProvider],
};

export default preview;
