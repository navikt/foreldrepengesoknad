import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SøkersituasjonSteg from './SøkersituasjonSteg';
import IntlProvider from '../../../intl/IntlProvider';
import withRouter from 'storybookHelpers/withRouter';
import EsContextStorybookHelper from '../../../storybookHelpers/EsContextStorybookHelper';
import { Path } from 'appData/paths';
import { Action } from 'appData/EsDataContext';
import { initAmplitude } from 'fpcommon/amplitude/amplitude';

export default {
    title: 'SøkersituasjonSteg',
    component: SøkersituasjonSteg,
    decorators: [withRouter],
    parameters: {
        routerDecoratorInitUrl: Path.SØKERSITUASJON,
    },
};

const Template: StoryFn<{ gåTilNesteSide: (action: Action) => void }> = ({ gåTilNesteSide }) => {
    initAmplitude();
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
