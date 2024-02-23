import { StoryFn } from '@storybook/react';

import ProgressStepper, { ProgressStepperProps } from './ProgressStepper';

export default {
    title: 'components/ProgressStepper',
    component: ProgressStepper,
};

const Template: StoryFn<ProgressStepperProps> = (args) => <ProgressStepper {...args} />;

export const Default = Template.bind({});
Default.args = {
    steps: [
        { id: '0', index: 0, label: 'Steg 1', isSelected: false },
        { id: '1', index: 1, label: 'Steg 2', isSelected: false },
        { id: '2', index: 2, label: 'Steg 3', isSelected: true },
        { id: '3', index: 3, label: 'Steg 4', isSelected: false },
        { id: '4', index: 4, label: 'Steg 5', isSelected: false },
    ],
};
