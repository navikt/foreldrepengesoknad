import { Meta, StoryObj } from '@storybook/react-vite';

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
        appName: 'foreldrepengesoknad',
    },
};

export const UmyndigEngangsstonad: Story = {
    args: {
        appName: 'engangsstonad',
    },
};

export const UmyndigSvangerskapspenger: Story = {
    args: {
        appName: 'svangerskapspengesoknad',
    },
};
