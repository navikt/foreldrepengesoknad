import { StoryFn } from '@storybook/react';

import DisplayTextWithLabel, { DisplayTextWithLabelProps } from './DisplayTextWithLabel';

export default {
    title: 'components/DisplayTextWithLabel',
    component: DisplayTextWithLabel,
};

const Template: StoryFn<DisplayTextWithLabelProps> = (args) => <DisplayTextWithLabel {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'Innehold i en block',
    text: 'Whatever',
};
