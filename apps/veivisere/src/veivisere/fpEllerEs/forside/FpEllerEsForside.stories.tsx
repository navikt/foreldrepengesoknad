import { Meta, StoryObj } from '@storybook/react';
import { FpEllerEsRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import FpEllerEsForside from './FpEllerEsForside';

const meta = {
    title: 'fpEllerEs/FpEllerEsForside',
    component: FpEllerEsForside,
} satisfies Meta<typeof FpEllerEsForside>;
export default meta;

export const Default: StoryObj = {
    render: () => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[FpEllerEsRoutes.SITUASJON]}>
                <FpEllerEsForside locale="nb" changeLocale={() => undefined} />
            </MemoryRouter>
        );
    },
};
