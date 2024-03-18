import { StoryFn } from '@storybook/react';

import Sidebanner, { SidebannerProps } from './Sidebanner';

export default {
    title: 'components/SideBanner',
    component: Sidebanner,
};

const Template: StoryFn<SidebannerProps> = (args) => <Sidebanner {...args} />;

export const Default = Template.bind({});
Default.args = {
    dialog: {
        text: 'Hei du, hvordan går det?',
        title: 'Overskrift',
    },
};
