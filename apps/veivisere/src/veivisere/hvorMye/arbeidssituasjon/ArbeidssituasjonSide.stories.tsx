import { Meta, StoryObj } from '@storybook/react';
import { HvorMyeRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import ArbeidssituasjonSide from './ArbeidssituasjonSide';

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

interface StoryArgs {}

const meta = {
    title: 'hvorMye/ArbeidssituasjonSide',
    component: ArbeidssituasjonSide,
} satisfies Meta<typeof ArbeidssituasjonSide & StoryArgs>;
export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
    render: () => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[HvorMyeRoutes.ARBEIDSSITUASJON]}>
                <ArbeidssituasjonSide
                    arbeidssituasjon={undefined}
                    setArbeidssituasjon={() => undefined}
                    satser={satser}
                />
            </MemoryRouter>
        );
    },
};
