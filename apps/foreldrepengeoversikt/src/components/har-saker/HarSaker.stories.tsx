import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { saker } from 'storybookData/saker/saker';

import { HarSaker } from './HarSaker';

const meta = {
    title: 'HarSaker',
    component: HarSaker,
    render: (props) => {
        return (
            <MemoryRouter>
                <HarSaker {...props} />
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof HarSaker>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        harMinstEttArbeidsforhold: false,
        grupperteSaker: [
            {
                antallBarn: 1,
                familiehendelsedato: '2023-01-02',
                type: 'fødsel',
                saker: saker.foreldrepenger.map((fp) => ({ ...fp, ytelse: 'FORELDREPENGER' })),
                ytelse: 'FORELDREPENGER',
                barn: undefined,
            },
        ],
    },
};
