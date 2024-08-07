import { Meta, StoryObj } from '@storybook/react';
import { FpEllerEsRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import SituasjonSide from './SituasjonSide';

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
} satisfies Meta<typeof SituasjonSide>;
export default meta;

type Story = StoryObj<typeof SituasjonSide>;

export const Default: Story = {
    render: ({ satser = DEFAULT_SATSER, setFpEllerEsSituasjon = () => undefined }) => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[FpEllerEsRoutes.SITUASJON]}>
                <SituasjonSide satser={satser} setFpEllerEsSituasjon={setFpEllerEsSituasjon} />
            </MemoryRouter>
        );
    },
};
