import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import TidligereUtenlandsoppholdPanel from './TidligereUtenlandsoppholdPanel';

export default {
    title: 'TidligereUtenlandsoppholdPanel',
    component: TidligereUtenlandsoppholdPanel,
};

const Template: StoryFn<{
    saveOnNext: () => void;
    saveOnPrevious: () => void;
    cancelApplication: () => void;
    goToPreviousStep: () => void;
}> = ({ saveOnNext, saveOnPrevious, cancelApplication, goToPreviousStep }) => {
    return (
        <TidligereUtenlandsoppholdPanel
            saveOnNext={saveOnNext}
            saveOnPrevious={saveOnPrevious}
            cancelApplication={cancelApplication}
            goToPreviousStep={goToPreviousStep}
            stepConfig={[
                {
                    id: '1',
                    label: 'Har bodd i utlandet',
                    isSelected: true,
                },
            ]}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    saveOnNext: action('button-click'),
    saveOnPrevious: action('button-click'),
    cancelApplication: action('button-click'),
    goToPreviousStep: action('button-click'),
};
