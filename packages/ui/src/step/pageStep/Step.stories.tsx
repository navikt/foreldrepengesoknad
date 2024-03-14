import { StoryFn } from '@storybook/react';

import Step, { StepProps } from './Step';

export default {
    title: 'step/Step',
    component: Step,
};

const Template: StoryFn<StepProps<string>> = (args) => <Step {...args} />;

export const Default = Template.bind({});
Default.args = {
    steps: [
        { id: 'test', label: 'Om Barnet', isSelected: false },
        { id: 'test2', label: 'Annet', isSelected: true },
        { id: 'test3', label: 'Oppsummering', isSelected: false },
    ],
    children: <>Her er det noe kult innhold</>,
};
