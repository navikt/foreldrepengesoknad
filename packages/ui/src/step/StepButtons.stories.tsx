import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import StepButtons from './StepButtons';

const meta = {
    component: StepButtons,
} satisfies Meta<typeof StepButtons>;
export default meta;

type Story = StoryObj<typeof meta>;

export const VisNeste: Story = {
    args: {
        isNextButtonVisible: true,
        isSendButton: false,
        isDisabledAndLoading: false,
        goToPreviousStep: action('button-click'),
    },
};

export const SkjulNeste: Story = {
    args: {
        ...VisNeste.args,
        isNextButtonVisible: false,
    },
};

export const SendSøknaden: Story = {
    args: {
        ...VisNeste.args,
        isSendButton: true,
    },
};

export const IsDisabledAndLoading: Story = {
    args: {
        ...VisNeste.args,
        isDisabledAndLoading: true,
    },
};
