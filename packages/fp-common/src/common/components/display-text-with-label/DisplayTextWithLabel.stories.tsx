import { ComponentMeta, Story } from '@storybook/react';
import DisplayTextWithLabel, { DisplayTextWithLabelProps } from './DisplayTextWithLabel';

export default {
    title: 'components/DisplayTextWithLabel',
    component: DisplayTextWithLabel,
} as ComponentMeta<typeof DisplayTextWithLabel>;

const Template: Story<DisplayTextWithLabelProps> = (args) => <DisplayTextWithLabel {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'Innehold i en block',
    text: 'Whatever',
};
