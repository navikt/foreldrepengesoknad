import { Meta, StoryObj } from '@storybook/react';

import { Umyndig } from './Umyndig';

const meta = {
    component: Umyndig,
    render: (props) => {
        return <Umyndig {...props} />;
    },
} satisfies Meta<typeof Umyndig>;
export default meta;

type Story = StoryObj<typeof meta>;

export const UmyndigForeldrepenger: Story = {
    args: {
        appnavn: 'Foreldrepenger',
    },
};

export const UmyndigEngangsstonad: Story = {
    args: {
        appnavn: 'Engangsstønad',
    },
};

export const UmyndigSvangerskapspenger: Story = {
    args: {
        appnavn: 'Svangerskapspenger',
    },
};
