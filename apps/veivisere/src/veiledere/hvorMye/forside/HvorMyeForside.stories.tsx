import { Meta, StoryObj } from '@storybook/react';
import { HvorMyeRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import HvorMyeForside from './HvorMyeForside';

interface StoryArgs {}

const meta = {
    title: 'hvorMye/HvorMyeForside',
    component: HvorMyeForside,
} satisfies Meta<typeof HvorMyeForside & StoryArgs>;
export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
    render: () => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[HvorMyeRoutes.ARBEIDSSITUASJON]}>
                <HvorMyeForside locale="nb" changeLocale={() => undefined} />
            </MemoryRouter>
        );
    },
};
