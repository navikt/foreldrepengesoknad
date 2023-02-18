import { ComponentMeta, Story } from '@storybook/react';
import Sidebanner, { SidebannerProps } from './Sidebanner';

export default {
    title: 'components/SideBanner',
    component: Sidebanner,
} as ComponentMeta<typeof Sidebanner>;

const Template: Story<SidebannerProps> = (args) => <Sidebanner {...args} />;

export const Default = Template.bind({});
Default.args = {
    dialog: {
        text: 'Hei du, hvordan går det?',
        title: 'Overskrift',
    },
};
