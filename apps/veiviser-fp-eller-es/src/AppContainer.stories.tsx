import { Meta, StoryObj } from '@storybook/react-vite';
import { StrictMode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { AppContainer } from './AppContainer';

const meta = {
    title: 'AppContainer',
    component: AppContainer,
    render: () => {
        return (
            <StrictMode>
                <MemoryRouter>
                    <AppContainer />
                </MemoryRouter>
            </StrictMode>
        );
    },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const FpEllerEsVeiviser: Story = {};

export const FpEllerEsVeiviserMockaStønadskontoerOgSatser: Story = {};
