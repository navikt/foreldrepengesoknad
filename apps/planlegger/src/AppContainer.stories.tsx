import { initAmplitude } from '@navikt/fp-metrics';
import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/react';
import { Action, PlanleggerDataContext } from 'appData/PlanleggerDataContext';
import AppContainer from './AppContainer';

export default {
    title: 'AppContainer',
    component: AppContainer,
};

const Template: StoryFn<{
    gåTilNesteSide: (action: Action) => void;
}> = ({ gåTilNesteSide = action('button-click') }) => {
    initAmplitude();
    return (
        <PlanleggerDataContext onDispatch={gåTilNesteSide}>
            <AppContainer />
        </PlanleggerDataContext>
    );
};

export const Default = Template.bind({});
