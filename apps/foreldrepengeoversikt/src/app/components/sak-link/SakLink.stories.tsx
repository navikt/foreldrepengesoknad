import { Meta, StoryObj } from '@storybook/react/*';
import { MemoryRouter } from 'react-router-dom';
import saker from 'storybookData/saker/saker.json';

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
        // @ts-ignore Sjekk Ytelse
        sak: saker.foreldrepenger[0],
    },
};
