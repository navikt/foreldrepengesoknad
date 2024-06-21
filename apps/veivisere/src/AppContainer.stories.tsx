import { Meta, StoryObj } from '@storybook/react';
import { ContextRoutes, FpEllerEsRoutes, HvaSkjerNårRoutes, HvorMyeRoutes } from 'appData/routes';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

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

const doApiMocking = (args: { brukStønadskontoMock?: boolean }) => {
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
};

const meta = {
    title: 'AppContainer',
    component: AppContainer,
} satisfies Meta<typeof AppContainer>;
export default meta;

type Story = StoryObj<{
    brukStønadskontoMock?: boolean;
}>;

export const HvorMyeVeiviser: Story = {
    render: (args) => {
        initAmplitude();
        doApiMocking(args);
        return (
            <StrictMode>
                <MemoryRouter initialEntries={[ContextRoutes.HVOR_MYE + HvorMyeRoutes.OM]}>
                    <AppContainer />
                </MemoryRouter>
            </StrictMode>
        );
    },
};

export const HvaSkjerNårVeiviser: Story = {
    render: (args) => {
        initAmplitude();
        doApiMocking(args);
        return (
            <StrictMode>
                <MemoryRouter initialEntries={[ContextRoutes.HVA_SKJER + HvaSkjerNårRoutes.OM]}>
                    <AppContainer />
                </MemoryRouter>
            </StrictMode>
        );
    },
};

export const FpEllerEsVeiviser: Story = {
    render: (args) => {
        initAmplitude();
        doApiMocking(args);
        return (
            <StrictMode>
                <MemoryRouter initialEntries={[ContextRoutes.FP_ELLER_ES + FpEllerEsRoutes.OM]}>
                    <AppContainer />
                </MemoryRouter>
            </StrictMode>
        );
    },
};
