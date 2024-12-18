import { Meta, StoryObj } from '@storybook/react/*';
import { MemoryRouter } from 'react-router-dom';
import { saker } from 'storybookData/saker/saker';

import { Ytelse } from '../../types/Ytelse';
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
        grupperteSaker: [
            {
                antallBarn: 1,
                familiehendelsedato: '2023-01-02',
                type: 'fødsel',
                // @ts-ignore Avklar om ytelse ligg i backend-data
                saker: saker.foreldrepenger,
                ytelse: Ytelse.FORELDREPENGER,
                barn: undefined,
            },
        ],
    },
};
