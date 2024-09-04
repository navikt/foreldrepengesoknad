import { Meta, StoryObj } from '@storybook/react';
import { HvorMyeRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import HvorMyeForside from './HvorMyeForside';

const meta = {
    title: 'hvorMye/HvorMyeForside',
    component: HvorMyeForside,
} satisfies Meta<typeof HvorMyeForside>;
export default meta;

type Story = StoryObj;

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
