import { Meta, StoryObj } from '@storybook/react';
import { InitialEntry } from 'history';
import { HttpResponse, http } from 'msw';
import { StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import AppContainer from './AppContainer';

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
                http.get('https://www.nav.no/fp/rest/satser', async () => {
                    const response = await fetch('https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser');
                    const json = await response.json();
                    return HttpResponse.json(json);
                }),
            ],
        },
    },
    render: () => {
        initAmplitude();
        return (
            <StrictMode>
                <MemoryRouter>
                    <AppContainer />
                </MemoryRouter>
            </StrictMode>
        );
    },
} satisfies Meta<{ initialEntries?: InitialEntry[]; brukMock?: boolean }>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FpEllerEsVeiviser: Story = {};

export const FpEllerEsVeiviserMockaStønadskontoerOgSatser: Story = {
    parameters: {
        msw: {
            handlers: [http.get('https://www.nav.no/fp/rest/satser', () => HttpResponse.json(SATSER))],
        },
    },
};
