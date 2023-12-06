import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SenereUtenlandsoppholdPanel from './SenereUtenlandsoppholdPanel';

export default {
    title: 'SenereUtenlandsoppholdPanel',
    component: SenereUtenlandsoppholdPanel,
};

const Template: StoryFn<{
    saveOnNext: () => void;
    saveOnPrevious: () => void;
    cancelApplication: () => void;
    goToPreviousStep: () => void;
}> = ({ saveOnNext, saveOnPrevious, cancelApplication, goToPreviousStep }) => {
    return (
        <SenereUtenlandsoppholdPanel
            saveOnNext={saveOnNext}
            saveOnPrevious={saveOnPrevious}
            cancelApplication={cancelApplication}
            goToPreviousStep={goToPreviousStep}
            stepConfig={[
                {
                    id: '1',
                    index: 1,
                    label: 'Skal bo i utlandet',
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
