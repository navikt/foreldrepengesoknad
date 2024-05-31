import { Meta, StoryObj } from '@storybook/react';
import { Action } from 'appData/HvorMyeDataContext';
import { FpEllerEsRoutes, HvaSkjerNårRoutes, HvorMyeRoutes } from 'appData/routes';
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
    gåTilNesteSide: (action: Action) => void;
    brukStønadskontoMock?: boolean;
}>;

export const HvorMyeVeileder: Story = {
    render: () => {
        initAmplitude();
        return (
            <StrictMode>
                <MemoryRouter initialEntries={[HvorMyeRoutes.HVOR_MYE + HvorMyeRoutes.OM_HVOR_MYE]}>
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
                <MemoryRouter initialEntries={[HvaSkjerNårRoutes.HVA_SKJER + HvaSkjerNårRoutes.OM_HVA_SKJER]}>
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
                <MemoryRouter initialEntries={[FpEllerEsRoutes.FP_ELLER_ES + FpEllerEsRoutes.OM_FP_ELLER_ES]}>
                    <AppContainer />
                </MemoryRouter>
            </StrictMode>
        );
    },
};
