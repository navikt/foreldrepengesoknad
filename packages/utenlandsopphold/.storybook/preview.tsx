import { withIntlProvider } from '@navikt/fp-utils-test';
import { Preview } from '@storybook/react';

import '@navikt/ds-css';

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
