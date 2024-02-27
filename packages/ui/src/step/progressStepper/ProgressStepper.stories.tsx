import { StoryFn } from '@storybook/react';

import ProgressStepper, { ProgressStepperProps } from './ProgressStepper';

export default {
    title: 'step/ProgressStepper',
    component: ProgressStepper,
};

const Template: StoryFn<ProgressStepperProps<string>> = (args) => <ProgressStepper {...args} />;

export const Default = Template.bind({});
Default.args = {
    steps: [
        { id: '0', label: 'Steg 1', isSelected: false },
        { id: '1', label: 'Steg 2', isSelected: false },
        { id: '2', label: 'Steg 3', isSelected: true },
        { id: '3', label: 'Steg 4', isSelected: false },
        { id: '4', label: 'Steg 5', isSelected: false },
    ],
};
