import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { initAmplitude } from '@navikt/fp-metrics';
import withRouter from 'storybook/decorators/withRouter';
import { Path } from 'appData/paths';
import { Action, EsDataContext } from 'appData/EsDataContext';
import UtenlandsoppholdSteg from './UtenlandsoppholdSteg';

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
        <EsDataContext onDispatch={gåTilNesteSide}>
            <UtenlandsoppholdSteg />
        </EsDataContext>
    );
};

export const Default = Template.bind({});
Default.args = {
    gåTilNesteSide: action('button-click'),
};
