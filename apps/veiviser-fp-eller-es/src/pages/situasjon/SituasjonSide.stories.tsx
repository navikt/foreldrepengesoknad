import { Meta, StoryObj } from '@storybook/react';
import { FpEllerEsRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { SituasjonSide } from './SituasjonSide';

const DEFAULT_SATSER = {
    engangstønad: [
        {
            fom: '01.01.2023',
            verdi: 92648,
        },
    ],
    grunnbeløp: [
        {
            fom: '01.05.2024',
            verdi: 124028,
        },
    ],
};

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
