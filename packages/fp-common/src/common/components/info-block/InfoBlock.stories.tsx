import { StoryFn } from '@storybook/react';

import InfoBlock, { InfoBlockProps } from './InfoBlock';

export default {
    title: 'components/InfoBlock',
    component: InfoBlock,
};

const Template: StoryFn<InfoBlockProps> = (args) => <InfoBlock {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Tekst i en infoboks',
};
