import { StoryFn } from '@storybook/react';

import Step, { StepProps } from './Step';

export default {
    title: 'components/Step',
    component: Step,
};

const Template: StoryFn<StepProps> = (args) => <Step {...args} />;

export const Default = Template.bind({});
Default.args = {
    steps: [
        { id: 'test', index: 1, label: 'Om Barnet', isSelected: false },
        { id: 'test2', index: 2, label: 'Annet', isSelected: true },
        { id: 'test3', index: 3, label: 'Oppsummering', isSelected: false },
    ],
    children: <>Her er det noe kult innhold</>,
};
