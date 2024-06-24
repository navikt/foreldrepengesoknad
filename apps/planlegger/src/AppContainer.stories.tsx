import { Meta, StoryObj } from '@storybook/react';
import { Action } from 'appData/PlanleggerDataContext';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { StrictMode } from 'react';

import { getAxiosInstance } from '@navikt/fp-api';
import { StønadskontoType } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';
import { TilgjengeligeStønadskontoer } from '@navikt/fp-types';

import AppContainer from './AppContainer';

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

const satser = {
    engangstønad: [
        {
            fom: '01.01.2023',
            verdi: 92648,
        },
        {
            fom: '01.01.2021',
            verdi: 90300,
        },
    ],
    grunnbeløp: [
        {
            fom: '01.05.2024',
            verdi: 124028,
        },
        {
            fom: '01.05.2023',
            verdi: 118620,
        },
    ],
};

const meta = {
    title: 'AppContainer',
    component: AppContainer,
} satisfies Meta<typeof AppContainer>;
export default meta;

type Story = StoryObj<{
    gåTilNesteSide: (action: Action) => void;
    brukMocks?: boolean;
}>;

export const Default: Story = {
    render: (args) => {
        initAmplitude();

        const axiosInstance = getAxiosInstance();
        const apiMock = new MockAdapter(axiosInstance);
        if (args.brukMocks) {
            apiMock.onPost('/rest/konto').reply(() => {
                return [200, kontoer];
            });
            apiMock.onGet('/rest/satser').reply(() => {
                return [200, satser];
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
            apiMock.onGet('/rest/satser').reply(async (config) => {
                const redirectResponse = await axios
                    .create()
                    .get('https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser', {
                        headers: config.headers,
                        timeout: config.timeout,
                    });
                return [200, redirectResponse.data];
            });
        }

        return (
            <StrictMode>
                <AppContainer />
            </StrictMode>
        );
    },
};
