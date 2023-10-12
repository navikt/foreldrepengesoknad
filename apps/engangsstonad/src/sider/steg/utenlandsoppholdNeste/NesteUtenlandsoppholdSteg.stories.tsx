import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IntlProvider from 'intl/IntlProvider';
import withRouter from 'storybookHelpers/withRouter';
import NesteUtenlandsoppholdSteg from './NesteUtenlandsoppholdSteg';
import { Path } from 'appData/paths';
import EsContextStorybookHelper from 'storybookHelpers/EsContextStorybookHelper';
import { Action, EsDataType } from 'appData/EsDataContext';
import { initAmplitude } from '@navikt/fp-metrics';

const utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: false,
    skalBoUtenforNorgeNeste12Mnd: true,
};

export default {
    title: 'NesteUtenlandsoppholdSteg',
    component: NesteUtenlandsoppholdSteg,
    decorators: [withRouter],
    parameters: {
        routerDecoratorInitUrl: Path.NESTE_UTENLANDSOPPHOLD,
    },
};

const Template: StoryFn<{ gåTilNesteSide: (action: Action) => void }> = ({ gåTilNesteSide }) => {
    initAmplitude();
    return (
        <IntlProvider språkkode="nb">
            <EsContextStorybookHelper
                onDispatch={gåTilNesteSide}
                initialState={{
                    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                }}
            >
                <NesteUtenlandsoppholdSteg />
            </EsContextStorybookHelper>
        </IntlProvider>
    );
};

export const Default = Template.bind({});
Default.args = {
    gåTilNesteSide: action('button-click'),
};
