import { Meta, StoryObj } from '@storybook/react';
import { HvaSkjerNårRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import SituasjonSide from './SituasjonSide';

const meta = {
    title: 'hvaSkjerNår/SituasjonSide',
    component: SituasjonSide,
} satisfies Meta<typeof SituasjonSide>;
export default meta;

type Story = StoryObj<typeof SituasjonSide>;

export const Default: Story = {
    render: ({ setHvaSkjerNårSituasjon = () => undefined }) => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[HvaSkjerNårRoutes.SITUASJON]}>
                <SituasjonSide setHvaSkjerNårSituasjon={setHvaSkjerNårSituasjon} />
            </MemoryRouter>
        );
    },
};
