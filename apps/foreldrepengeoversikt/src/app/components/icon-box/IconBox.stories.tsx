import { Meta, StoryObj } from '@storybook/react/*';

import { PeriodeColor } from '@navikt/fp-constants';

import IconBox from './IconBox';

const meta = {
    title: 'IconBox',
    component: IconBox,
} satisfies Meta<typeof IconBox>;
export default meta;

type Story = StoryObj<typeof meta>;

export const BlueBox: Story = {
    args: {
        children: <div>test</div>,
        color: PeriodeColor.BLUE,
    },
};

export const GreenBoxWithStripes: Story = {
    args: {
        children: <div>test</div>,
        color: PeriodeColor.GREEN,
        stripes: true,
    },
};
