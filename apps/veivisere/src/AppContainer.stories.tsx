import { Meta, StoryObj } from '@storybook/react';
import { ContextRoutes, HvaSkjerNårRoutes } from 'appData/routes';
import { InitialEntry } from 'history';
import { HttpResponse, http } from 'msw';
import { StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { StønadskontoType } from '@navikt/fp-constants';
import { initAmplitude } from '@navikt/fp-metrics';
import { TilgjengeligeStønadskontoer } from '@navikt/fp-types';

import AppContainer from './AppContainer';

const STØNADSKONTOER = {
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

const SATSER = {
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
    parameters: {
        msw: {
            handlers: [
                http.post('/rest/konto', async ({ request }) => {
                    const body = await request.json();
                    const response = await fetch('https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto', {
                        body: JSON.stringify(body),
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const json = await response.json();
                    return HttpResponse.json(json);
                }),
                http.get('/rest/satser', async () => {
                    const response = await fetch('https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser');
                    const json = await response.json();
                    return HttpResponse.json(json);
                }),
            ],
        },
    },
    render: ({ initialEntries }) => {
        initAmplitude();
        return (
            <StrictMode>
                <MemoryRouter initialEntries={initialEntries}>
                    <AppContainer />
                </MemoryRouter>
            </StrictMode>
        );
    },
} satisfies Meta<{ initialEntries?: InitialEntry[]; brukMock?: boolean }>;
export default meta;

type Story = StoryObj<typeof meta>;

export const HvorMyeVeiviser: Story = {
    args: {
        initialEntries: [ContextRoutes.HVOR_MYE],
    },
};

export const HvaSkjerNårVeiviser: Story = {
    args: {
        initialEntries: [ContextRoutes.HVA_SKJER + HvaSkjerNårRoutes.OM],
    },
};

export const FpEllerEsVeiviser: Story = {
    args: {
        initialEntries: [ContextRoutes.FP_ELLER_ES],
    },
};

export const HvorMyeVeiviserMockaStønadskontoerOgSatser: Story = {
    args: HvorMyeVeiviser.args,
    parameters: {
        msw: {
            handlers: [
                http.post('/rest/konto', () => HttpResponse.json(STØNADSKONTOER)),
                http.get('/rest/satser', () => HttpResponse.json(SATSER)),
            ],
        },
    },
};

export const HvaSkjerNårVeiviserMockaStønadskontoerOgSatser: Story = {
    args: HvaSkjerNårVeiviser.args,
    parameters: HvorMyeVeiviserMockaStønadskontoerOgSatser.parameters,
};

export const FpEllerEsVeiviserMockaStønadskontoerOgSatser: Story = {
    args: FpEllerEsVeiviser.args,
    parameters: HvorMyeVeiviserMockaStønadskontoerOgSatser.parameters,
};
