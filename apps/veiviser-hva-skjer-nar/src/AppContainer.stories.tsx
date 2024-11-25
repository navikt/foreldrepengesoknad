import { Meta, StoryObj } from '@storybook/react';
import { InitialEntry } from 'history';
import { StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import { AppContainer } from './AppContainer';

const meta = {
    title: 'AppContainer',
    component: AppContainer,
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

export const HvaSkjerNårVeiviser: Story = {};
