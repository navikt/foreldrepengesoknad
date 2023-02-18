import { ComponentMeta, Story } from '@storybook/react';
import InfoBlock, { InfoBlockProps } from './InfoBlock';

export default {
    title: 'components/InfoBlock',
    component: InfoBlock,
} as ComponentMeta<typeof InfoBlock>;

const Template: Story<InfoBlockProps> = (args) => <InfoBlock {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'Tekst i en infoboks',
};
