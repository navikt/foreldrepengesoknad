import { Meta, StoryObj } from '@storybook/react/*';
import saker from 'storybookData/saker/saker.json';

import StatusTag from './StatusTag';

const meta = {
    title: 'StatusTag',
    component: StatusTag,
} satisfies Meta<typeof StatusTag>;
export default meta;

type Story = StoryObj<typeof StatusTag>;

export const AktivSak: Story = {
    args: {
        //@ts-ignore fiks
        sak: saker.foreldrepenger[0],
    },
};

export const AvsluttetSak: Story = {
    args: {
        //@ts-ignore fiks
        sak: {
            //@ts-ignore fiks
            ...saker.foreldrepenger[0],
            sakAvsluttet: true,
        },
    },
};
