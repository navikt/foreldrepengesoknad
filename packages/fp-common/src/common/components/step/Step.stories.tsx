import { StoryFn } from '@storybook/react';
import { HashRouter } from 'react-router-dom';

import Step, { StepProps } from './Step';

export default {
    title: 'components/Step',
    component: Step,
};

const Template: StoryFn<StepProps> = (args) => (
    <HashRouter>
        <Step {...args} />
    </HashRouter>
);

export const Default = Template.bind({});
Default.args = {
    pageTitle: 'Foreldrepenger',
    activeStepId: 'test',
    steps: [
        { id: 'test', index: 1, label: 'Om Barnet' },
        { id: 'test2', index: 2, label: 'Annet' },
        { id: 'test3', index: 3, label: 'Oppsummering' },
    ],
    children: <>Her er det noe kult innhold</>,
};
