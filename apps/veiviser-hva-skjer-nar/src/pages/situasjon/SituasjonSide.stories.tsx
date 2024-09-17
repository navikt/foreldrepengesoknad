import { Meta, StoryObj } from '@storybook/react';
import { HvaSkjerNårRoutes } from 'appData/routes';
import { MemoryRouter } from 'react-router-dom';

import { initAmplitude } from '@navikt/fp-metrics';

import SituasjonSide from './SituasjonSide';

const meta = {
    title: 'hvaSkjerNår/SituasjonSide',
    component: SituasjonSide,
    render: (props) => {
        initAmplitude();
        return (
            <MemoryRouter initialEntries={[HvaSkjerNårRoutes.SITUASJON]}>
                <SituasjonSide {...props} />
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof SituasjonSide>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        setHvaSkjerNårSituasjon: () => undefined,
    },
};
