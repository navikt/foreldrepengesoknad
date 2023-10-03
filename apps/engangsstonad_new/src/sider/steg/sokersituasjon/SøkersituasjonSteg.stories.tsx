import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SøkersituasjonSteg from './SøkersituasjonSteg';
import IntlProvider from '../../../intl/IntlProvider';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';
import EsContextStorybookHelper from '../../../storybookHelpers/EsContextStorybookHelper';
import { Path } from 'appData/paths';
import { Action } from 'appData/EsDataContext';

export default {
    title: 'SøkersituasjonSteg',
    component: SøkersituasjonSteg,
    decorators: [withRouterProvider],
    parameters: {
        routerDecoratorInitUrl: Path.SØKERSITUASJON,
    },
};

const Template: StoryFn<{ gåTilNesteSide: (action: Action) => void }> = ({ gåTilNesteSide }) => {
    return (
        <IntlProvider språkkode="nb">
            <EsContextStorybookHelper onDispatch={gåTilNesteSide}>
                <SøkersituasjonSteg />
            </EsContextStorybookHelper>
        </IntlProvider>
    );
};

export const Default = Template.bind({});
Default.args = {
    gåTilNesteSide: action('button-click'),
};
