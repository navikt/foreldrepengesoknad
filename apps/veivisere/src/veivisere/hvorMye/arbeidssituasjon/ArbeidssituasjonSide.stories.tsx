import { Meta, StoryObj } from '@storybook/react';
import { HvorMyeRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import ArbeidssituasjonSide from './ArbeidssituasjonSide';

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
                <ArbeidssituasjonSide arbeidssituasjon={undefined} setArbeidssituasjon={() => undefined} />
            </MemoryRouter>
        );
    },
};
