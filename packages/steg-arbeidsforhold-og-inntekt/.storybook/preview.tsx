import { Preview } from '@storybook/react-vite';

import { formHookMessages } from '@navikt/fp-form-hooks';
import { egenNæringMessages } from '@navikt/fp-steg-egen-naering';
import { uiMessages } from '@navikt/fp-ui';
import { getIntlDecorator, withThemeDecorator } from '@navikt/fp-utils-test';

import enMessages from '../src/intl/messages/en_US.json';
import nbMessages from '../src/intl/messages/nb_NO.json';
import nnMessages from '../src/intl/messages/nn_NO.json';
import './index.css';

const withIntlProvider = getIntlDecorator({
    nb: { ...nbMessages, ...egenNæringMessages.nb, ...uiMessages.nb, ...formHookMessages.nb },
    nn: { ...nnMessages, ...egenNæringMessages.nn, ...uiMessages.nn, ...formHookMessages.nn },
    en: { ...enMessages, ...egenNæringMessages.en, ...uiMessages.en, ...formHookMessages.en },
});

export const parameters = {
    // a11y-addonen viser tilgjengelegheitsbrot i eit eige panel i Storybook UI-et, til lokal DX-feedback.
    // Han er ikkje ein CI-gate (best-practice-regler på isolerte komponentar gir mykje støy) - sjå
    // packages/utils-test/src/a11y/uuTest.ts for den faktiske a11y-testinga i CI.
    a11y: { test: 'todo' },
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
};

//eslint-disable-next-line import-x/no-default-export
export default preview;
