import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';

import EgenNæringPanel from './EgenNæringPanel';

const defaultExport = {
    title: 'EgenNæringPanel',
    component: EgenNæringPanel,
};

export default defaultExport;

interface Props {
    saveOnNext: () => void;
    saveOnPrevious: () => void;
    cancelApplication: () => void;
    goToPreviousStep: () => void;
    onStepChange: () => void;
}

const Template: StoryFn<Props> = ({
    saveOnNext = action('button-click'),
    saveOnPrevious = action('button-click'),
    cancelApplication = action('button-click'),
    goToPreviousStep = action('button-click'),
    onStepChange = action('button-click'),
}) => {
    return (
        <EgenNæringPanel
            saveOnNext={saveOnNext}
            saveOnPrevious={saveOnPrevious}
            onStepChange={onStepChange}
            cancelApplication={cancelApplication}
            goToPreviousStep={goToPreviousStep}
            stepConfig={[
                {
                    id: 'BARNET_PATH',
                    label: 'Barnet',
                    isSelected: false,
                },
                {
                    id: 'EGEN_NÆRING',
                    label: 'Arbeid som selvstendig næringsdrivende',
                    isSelected: true,
                },
            ]}
            stønadstype="Svangerskapspenger"
        />
    );
};
export const Default = Template.bind({});
