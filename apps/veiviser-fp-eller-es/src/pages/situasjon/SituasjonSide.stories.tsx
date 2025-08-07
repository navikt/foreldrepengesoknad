import { Meta, StoryObj } from '@storybook/react-vite';
import { FpEllerEsRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_SATSER } from '@navikt/fp-constants';

import { SituasjonSide } from './SituasjonSide';

const meta = {
    title: 'fpEllerEs/SituasjonSide',
    component: SituasjonSide,
    render: (props) => {
        return (
            <MemoryRouter initialEntries={[FpEllerEsRoutes.SITUASJON]}>
                <SituasjonSide {...props} />
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof SituasjonSide>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        satser: DEFAULT_SATSER,
        setFpEllerEsSituasjon: () => undefined,
    },
};
