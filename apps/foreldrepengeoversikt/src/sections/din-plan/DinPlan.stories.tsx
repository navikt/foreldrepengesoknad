import { Meta, StoryObj } from '@storybook/react/*';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import saker from 'storybookData/saker/saker.json';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';

import OversiktRoutes from '../../routes/routes';
import { DinPlan } from './DinPlan';

const queryClient = new QueryClient();

const meta = {
    title: 'DinPlan',
    component: DinPlan,
    render: (props) => {
        return (
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/${OversiktRoutes.DIN_PLAN}/352011079`]}>
                    <Routes>
                        <Route element={<DinPlan {...props} />} path={`/${OversiktRoutes.DIN_PLAN}/:saksnummer`} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    },
} satisfies Meta<typeof DinPlan>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        msw: {
            handlers: [http.get('https://oversikt/rest/innsyn/v2/saker', () => HttpResponse.json(saker))],
        },
    },
    args: {
        annenPartsPerioder: [
            {
                fom: '2022-10-14',
                tom: '2022-12-21',
                kontoType: StønadskontoType.Fedrekvote,
                forelder: Forelder.farMedmor,
            },
        ],
        navnPåForeldre: {
            mor: 'Helga',
            farMedmor: 'Espen',
        },
    },
};
