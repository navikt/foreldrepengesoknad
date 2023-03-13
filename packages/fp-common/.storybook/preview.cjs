import '@navikt/ds-css';
import { reactIntl } from './reactIntl.cjs';

export const parameters = {
    reactIntl,
    locale: reactIntl.defaultLocale,
    locales: {
        nb: 'Norsk Bokmål',
        nn: 'Norsk Nynorsk',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
