import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import StepButtons from './StepButtons';

export default {
    title: 'step/StepButtons',
    component: StepButtons,
};

const Template: StoryFn<{ isNextButtonVisible?: boolean; isSendButton?: boolean; isDisabledAndLoading?: boolean }> = ({
    isNextButtonVisible = true,
    isSendButton = false,
    isDisabledAndLoading = false,
}) => (
    <StepButtons
        isNexButtonVisible={isNextButtonVisible}
        goToPreviousStep={action('button-click')}
        isSendButton={isSendButton}
        isDisabledAndLoading={isDisabledAndLoading}
    />
);

export const SkjulNeste = Template.bind({});
SkjulNeste.args = {
    isNextButtonVisible: false,
};

export const VisNeste = Template.bind({});

export const SendSøknaden = Template.bind({});
SendSøknaden.args = {
    isSendButton: true,
};

export const IsDisabledAndLoading = Template.bind({});
IsDisabledAndLoading.args = {
    isDisabledAndLoading: true,
};
