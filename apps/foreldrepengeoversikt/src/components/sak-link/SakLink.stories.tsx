import { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { saker } from 'storybookData/saker/saker';

import { SakLink } from './SakLink';

const meta = {
    title: 'SakLink',
    component: SakLink,
    render: (props) => {
        return (
            <MemoryRouter>
                <SakLink {...props} />
            </MemoryRouter>
        );
    },
} satisfies Meta<typeof SakLink>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        harMinstEttArbeidsforhold: true,
        sak: {
            ...saker.foreldrepenger[0],
            ytelse: 'FORELDREPENGER',
        },
    },
};
