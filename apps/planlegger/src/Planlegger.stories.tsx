import { Meta, StoryObj } from '@storybook/react';
import { Action, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { getAxiosInstance } from '@navikt/fp-api';
import { StønadskontoType } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';
import { TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { ErrorBoundary, IntlProvider, uiMessages } from '@navikt/fp-ui';

import { PlanleggerDataFetcher } from './Planlegger';
import enMessages from './intl/messages/en_US.json';
import nbMessages from './intl/messages/nb_NO.json';
import nnMessages from './intl/messages/nn_NO.json';

const kontoer = {
    '100': {
        kontoer: [
            {
                konto: StønadskontoType.Mødrekvote,
                dager: 75,
            },
            {
                konto: StønadskontoType.Fedrekvote,
                dager: 75,
            },
            {
                konto: StønadskontoType.Fellesperiode,
                dager: 80,
            },
            {
                konto: StønadskontoType.ForeldrepengerFørFødsel,
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
    '80': {
        kontoer: [
            {
                konto: StønadskontoType.Mødrekvote,
                dager: 95,
            },
            {
                konto: StønadskontoType.Fedrekvote,
                dager: 95,
            },
            {
                konto: StønadskontoType.Fellesperiode,
                dager: 90,
            },
            {
                konto: StønadskontoType.ForeldrepengerFørFødsel,
                dager: 15,
            },
        ],
        minsteretter: {
            farRundtFødsel: 0,
            toTette: 0,
        },
    },
} as TilgjengeligeStønadskontoer;

const allNbMessages = { ...nbMessages, ...uiMessages.nb };

const MESSAGES_GROUPED_BY_LOCALE = {
    nb: allNbMessages,
    nn: { ...nnMessages, ...uiMessages.nn },
    en: { ...enMessages, ...uiMessages.en },
};

const meta = {
    title: 'PlanleggerDataFetcher',
    component: PlanleggerDataFetcher,
} satisfies Meta<typeof PlanleggerDataFetcher>;
export default meta;

type Story = StoryObj<{
    gåTilNesteSide: (action: Action) => void;
    brukStønadskontoMock?: boolean;
}>;

export const Default: Story = {
    render: (args) => {
        initAmplitude();

        const axiosInstance = getAxiosInstance();
        const apiMock = new MockAdapter(axiosInstance);
        if (args.brukStønadskontoMock) {
            apiMock.onPost('/rest/konto').reply(() => {
                return [200, kontoer];
            });
        } else {
            apiMock.onPost('/rest/konto').reply(async (config) => {
                const redirectResponse = await axios
                    .create()
                    .post('https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto', config.data, {
                        withCredentials: config.withCredentials,
                        headers: config.headers,
                        timeout: config.timeout,
                    });
                return [200, redirectResponse.data];
            });
        }

        return (
            <StrictMode>
                <IntlProvider locale="nb" messagesGroupedByLocale={MESSAGES_GROUPED_BY_LOCALE}>
                    <ErrorBoundary appName="Foreldrepengeplanlegger" retryCallback={() => undefined}>
                        <BrowserRouter>
                            <PlanleggerDataContext initialState={{}}>
                                <PlanleggerDataFetcher locale="nb" changeLocale={() => undefined} />
                            </PlanleggerDataContext>
                        </BrowserRouter>
                    </ErrorBoundary>
                </IntlProvider>
            </StrictMode>
        );
    },
};
