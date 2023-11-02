import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import withRouter from 'storybookHelpers/withRouter';
import TidligereUtenlandsoppholdSteg from './TidligereUtenlandsoppholdSteg';
import { Path } from 'appData/paths';
import EsContextStorybookHelper from 'storybookHelpers/EsContextStorybookHelper';
import { Action, EsDataType } from 'appData/EsDataContext';
import { initAmplitude } from '@navikt/fp-metrics';

const utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: true,
    skalBoUtenforNorgeNeste12Mnd: false,
};

export default {
    title: 'TidligereUtenlandsoppholdSteg',
    component: TidligereUtenlandsoppholdSteg,
    decorators: [withRouter],
    parameters: {
        routerDecoratorInitUrl: Path.TIDLIGERE_UTENLANDSOPPHOLD,
    },
};

const Template: StoryFn<{ gåTilNesteSide: (action: Action) => void }> = ({ gåTilNesteSide }) => {
    initAmplitude();
    return (
        <EsContextStorybookHelper
            onDispatch={gåTilNesteSide}
            initialState={{
                [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
            }}
        >
            <TidligereUtenlandsoppholdSteg />
        </EsContextStorybookHelper>
    );
};

export const Default = Template.bind({});
Default.args = {
    gåTilNesteSide: action('button-click'),
};
