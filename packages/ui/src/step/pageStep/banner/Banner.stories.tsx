import { StoryFn } from '@storybook/react';

import Banner, { BannerProps } from './Banner';

export default {
    title: 'components/Banner',
    component: Banner,
};

const Template: StoryFn<BannerProps> = (args) => <Banner {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Dette er innhold for et banner',
    size: 'small',
};
