import { Meta, StoryObj } from '@storybook/react/*';
import saker from 'storybook/storyData/saker/saker.json';

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
        sak: {
            //@ts-ignore fiks
            ...saker.foreldrepenger[0],
            sakAvsluttet: true,
        },
    },
};
