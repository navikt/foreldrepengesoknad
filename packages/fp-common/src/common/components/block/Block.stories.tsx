import { ComponentMeta, Story } from '@storybook/react';
import Block, { BlockProps } from './Block';

export default {
    title: 'components/Block',
    component: Block,
} as ComponentMeta<typeof Block>;

const Template: Story<BlockProps> = (args) => <Block {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Innehold i en block',
};
