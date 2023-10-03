import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IntlProvider from 'intl/IntlProvider';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';
import SisteUtenlandsopphold from './SisteUtenlandsopphold';
import { Path } from 'appData/paths';
import EsContextStorybookHelper from '../../../storybookHelpers/EsContextStorybookHelper';
import { Action, EsDataType } from 'appData/EsDataContext';

const utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: true,
    skalBoUtenforNorgeNeste12Mnd: false,
};

export default {
    title: 'SisteUtenlandsopphold',
    component: SisteUtenlandsopphold,
    decorators: [withRouterProvider],
    parameters: {
        routerDecoratorInitUrl: Path.SISTE_UTENLANDSOPPHOLD,
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
                <SisteUtenlandsopphold />
            </EsContextStorybookHelper>
        </IntlProvider>
    );
};

export const Default = Template.bind({});
Default.args = {
    gåTilNesteSide: action('button-click'),
};
