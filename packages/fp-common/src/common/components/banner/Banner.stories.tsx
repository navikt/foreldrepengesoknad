import { ComponentMeta, Story } from '@storybook/react';
import Banner, { BannerProps } from './Banner';

export default {
    title: 'components/Banner',
    component: Banner,
} as ComponentMeta<typeof Banner>;

const Template: Story<BannerProps> = (args) => <Banner {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Dette er innhold for et banner',
    size: 'small',
};
