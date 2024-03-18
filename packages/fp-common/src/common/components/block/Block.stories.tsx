import { StoryFn } from '@storybook/react';

import Block, { BlockProps } from './Block';

export default {
    title: 'components/Block',
    component: Block,
};

const Template: StoryFn<BlockProps> = (args) => <Block {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Innehold i en block',
};
