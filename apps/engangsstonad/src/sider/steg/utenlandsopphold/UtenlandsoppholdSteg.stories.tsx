import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import UtenlandsoppholdSteg from './UtenlandsoppholdSteg';
import withRouter from 'storybookHelpers/withRouter';
import { Path } from 'appData/paths';
import { Action } from 'appData/EsDataContext';
import EsContextStorybookHelper from 'storybookHelpers/EsContextStorybookHelper';
import { initAmplitude } from '@navikt/fp-metrics';

export default {
    title: 'UtenlandsoppholdSteg',
    component: UtenlandsoppholdSteg,
    decorators: [withRouter],
    parameters: {
        routerDecoratorInitUrl: Path.UTENLANDSOPPHOLD,
    },
};

const Template: StoryFn<{ gåTilNesteSide: (action: Action) => void }> = ({ gåTilNesteSide }) => {
    initAmplitude();
    return (
        <EsContextStorybookHelper onDispatch={gåTilNesteSide}>
            <UtenlandsoppholdSteg />
        </EsContextStorybookHelper>
    );
};

export const Default = Template.bind({});
Default.args = {
    gåTilNesteSide: action('button-click'),
};
