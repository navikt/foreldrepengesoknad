import { Preview } from '@storybook/react';
import dayjs from 'dayjs';
import 'dayjs/locale/nb.js';
import 'dayjs/locale/nn.js';
import React from 'react';

import '@navikt/ds-css';

import { arbeidsforholdOgInntektMessages } from '@navikt/fp-steg-arbeidsforhold-og-inntekt';
import { egenNæringMessages } from '@navikt/fp-steg-egen-naering';
import { frilansMessages } from '@navikt/fp-steg-frilans';
import { oppsummeringMessages } from '@navikt/fp-steg-oppsummering';
import { utenlandsoppholdMessages } from '@navikt/fp-steg-utenlandsopphold';
import { uiMessages } from '@navikt/fp-ui';
import { getIntlDecorator } from '@navikt/fp-utils-test';
import { uttaksplanMessages } from '@navikt/fp-uttaksplan';

import nbMessages from '../src/intl/nb_NO.json';
import nnMessages from '../src/intl/nn_NO.json';
import '../src/styles/app.css';

dayjs.locale('nb');

const scriptTag = document.createElement('script');
scriptTag.type = 'text/json';
scriptTag.id = 'nav:appSettings';
scriptTag.innerHTML = JSON.stringify({
    APP_VERSION: 'test',
});
document.head.appendChild(scriptTag);

const withIntlProvider = getIntlDecorator({
    nb: {
        ...nbMessages,
        ...uttaksplanMessages.nb,
        ...uiMessages.nb,
        ...utenlandsoppholdMessages.nb,
        ...oppsummeringMessages.nb,
        ...arbeidsforholdOgInntektMessages.nb,
        ...egenNæringMessages.nb,
        ...frilansMessages.nb,
    },
    nn: {
        ...nnMessages,
        ...uttaksplanMessages.nn,
        ...uiMessages.nn,
        ...utenlandsoppholdMessages.nn,
        ...oppsummeringMessages.nn,
        ...arbeidsforholdOgInntektMessages.nn,
        ...egenNæringMessages.nn,
        ...frilansMessages.nn,
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
