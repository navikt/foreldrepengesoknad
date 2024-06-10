import { Meta, StoryObj } from '@storybook/react';
import { ContextRoutes, FpEllerEsRoutes, HvaSkjerNårRoutes, HvorMyeRoutes } from 'appData/routes';
import { StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import AppContainer from './AppContainer';

const meta = {
    title: 'AppContainer',
    component: AppContainer,
} satisfies Meta<typeof AppContainer>;
export default meta;

type Story = StoryObj<{
    brukStønadskontoMock?: boolean;
}>;

export const HvorMyeVeileder: Story = {
    render: () => {
        initAmplitude();
        return (
            <StrictMode>
                <MemoryRouter initialEntries={[ContextRoutes.HVOR_MYE + HvorMyeRoutes.OM]}>
                    <AppContainer />
                </MemoryRouter>
            </StrictMode>
        );
    },
};

export const HvaSkjerNårVeileder: Story = {
    render: () => {
        initAmplitude();
        return (
            <StrictMode>
                <MemoryRouter initialEntries={[ContextRoutes.HVA_SKJER + HvaSkjerNårRoutes.OM]}>
                    <AppContainer />
                </MemoryRouter>
            </StrictMode>
        );
    },
};

export const FpEllerEsVeileder: Story = {
    render: () => {
        initAmplitude();
        return (
            <StrictMode>
                <MemoryRouter initialEntries={[ContextRoutes.FP_ELLER_ES + FpEllerEsRoutes.OM]}>
                    <AppContainer />
                </MemoryRouter>
            </StrictMode>
        );
    },
};
