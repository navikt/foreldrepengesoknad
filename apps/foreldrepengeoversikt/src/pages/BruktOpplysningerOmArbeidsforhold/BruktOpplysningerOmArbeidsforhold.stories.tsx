import { Meta, StoryObj } from '@storybook/react';

import { BruktOpplysningerOmArbeidsforhold } from './BruktOpplysningerOmArbeidsforhold';

const meta = {
    title: 'BruktOpplysningerOmArbeidsforhold',
    component: BruktOpplysningerOmArbeidsforhold,
} satisfies Meta<typeof BruktOpplysningerOmArbeidsforhold>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
