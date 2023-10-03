import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import UtenlandsoppholdSteg from './UtenlandsoppholdSteg';
import IntlProvider from 'intl/IntlProvider';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';
import { Path } from 'appData/paths';
import { Action } from 'appData/EsDataContext';
import EsContextStorybookHelper from '../../../storybookHelpers/EsContextStorybookHelper';

export default {
    title: 'UtenlandsoppholdSteg',
    component: UtenlandsoppholdSteg,
    decorators: [withRouterProvider],
    parameters: {
        routerDecoratorInitUrl: Path.UTENLANDSOPPHOLD,
    },
};

const Template: StoryFn<{ gåTilNesteSide: (action: Action) => void }> = ({ gåTilNesteSide }) => {
    return (
        <IntlProvider språkkode="nb">
            <EsContextStorybookHelper onDispatch={gåTilNesteSide}>
                <UtenlandsoppholdSteg />
            </EsContextStorybookHelper>
        </IntlProvider>
    );
};

export const Default = Template.bind({});
Default.args = {
    gåTilNesteSide: action('button-click'),
};
