import { Meta, StoryObj } from '@storybook/react-vite';
import { FpEllerEsRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { FpEllerEsForside } from './FpEllerEsForside';

const meta = {
    title: 'fpEllerEs/FpEllerEsForside',
    component: FpEllerEsForside,
} satisfies Meta<typeof FpEllerEsForside>;
export default meta;

export const Default: StoryObj = {
    render: () => {
        return (
            <MemoryRouter initialEntries={[FpEllerEsRoutes.SITUASJON]}>
                <FpEllerEsForside />
            </MemoryRouter>
        );
    },
};
