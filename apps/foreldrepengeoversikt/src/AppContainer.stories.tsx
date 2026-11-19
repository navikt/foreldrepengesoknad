import { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { saker } from 'storybookData/saker/saker';
import { tidslinjeHendelserFP } from 'storybookData/tidslinjeHendelser/tidslinjeHendelser.ts';

import { lagHandlers } from '../mock/scenarioer.ts';
import { AppContainer } from './AppContainer';

const meta = {
    title: 'AppContainer',
    component: AppContainer,

    render: () => {
        return (
            <MemoryRouter>
                <AppContainer />
            </MemoryRouter>
        );
    },

    beforeEach({ msw }) {
        msw.use(...lagHandlers({ saker, tidslinjePerSak: { '352011079': tidslinjeHendelserFP } }));
    },
} satisfies Meta<typeof AppContainer>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
