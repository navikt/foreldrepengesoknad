import { Meta, StoryObj } from '@storybook/react';
import { HvaSkjerNårRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import HvaSkjerNårForside from './HvaSkjerNårForside';

const meta = {
    title: 'hvaSkjerNår/HvaSkjerNårForside',
    component: HvaSkjerNårForside,
} satisfies Meta<typeof HvaSkjerNårForside>;
export default meta;

export const Default: StoryObj = {
    render: () => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[HvaSkjerNårRoutes.SITUASJON]}>
                <HvaSkjerNårForside locale="nb" changeLocale={() => undefined} />
            </MemoryRouter>
        );
    },
};
