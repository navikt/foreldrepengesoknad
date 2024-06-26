import { Meta, StoryObj } from '@storybook/react';
import { FpEllerEsRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import SituasjonSide from './SituasjonSide';

const satser = {
    engangstønad: [
        {
            fom: '01.01.2023',
            verdi: 92648,
        },
        {
            fom: '01.01.2021',
            verdi: 90300,
        },
    ],
    grunnbeløp: [
        {
            fom: '01.05.2024',
            verdi: 124028,
        },
        {
            fom: '01.05.2023',
            verdi: 118620,
        },
    ],
};

const meta = {
    title: 'fpEllerEs/SituasjonSide',
    component: SituasjonSide,
} satisfies Meta<typeof SituasjonSide>;
export default meta;

export const Default: StoryObj = {
    render: () => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[FpEllerEsRoutes.SITUASJON]}>
                <SituasjonSide satser={satser} />
            </MemoryRouter>
        );
    },
};
