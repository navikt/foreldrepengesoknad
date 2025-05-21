import { Meta, StoryObj } from '@storybook/react';

import { BruktOpplysniungerOmArbeidsforhold } from './BruktOpplysningerOmArbeidsforhold';

const meta = {
    title: 'BruktOpplysniungerOmArbeidsforhold',
    component: BruktOpplysniungerOmArbeidsforhold,
} satisfies Meta<typeof BruktOpplysniungerOmArbeidsforhold>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <BruktOpplysniungerOmArbeidsforhold />,
};
