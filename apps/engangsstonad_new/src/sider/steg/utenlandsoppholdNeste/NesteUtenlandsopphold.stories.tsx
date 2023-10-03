import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IntlProvider from 'intl/IntlProvider';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';
import NesteUtenlandsopphold from './NesteUtenlandsopphold';
import { Path } from 'appData/paths';
import EsContextStorybookHelper from '../../../storybookHelpers/EsContextStorybookHelper';
import { Action, EsDataType } from 'appData/EsDataContext';

const utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: false,
    skalBoUtenforNorgeNeste12Mnd: true,
};

export default {
    title: 'NesteUtenlandsopphold',
    component: NesteUtenlandsopphold,
    decorators: [withRouterProvider],
    parameters: {
        routerDecoratorInitUrl: Path.NESTE_UTENLANDSOPPHOLD,
    },
};

const Template: StoryFn<{ gåTilNesteSide: (action: Action) => void }> = ({ gåTilNesteSide }) => {
    return (
        <IntlProvider språkkode="nb">
            <EsContextStorybookHelper
                onDispatch={gåTilNesteSide}
                initialState={{
                    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                }}
            >
                <NesteUtenlandsopphold />
            </EsContextStorybookHelper>
        </IntlProvider>
    );
};

export const Default = Template.bind({});
Default.args = {
    gåTilNesteSide: action('button-click'),
};
