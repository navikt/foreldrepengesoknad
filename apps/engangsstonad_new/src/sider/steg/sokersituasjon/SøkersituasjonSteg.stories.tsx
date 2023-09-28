import { StoryFn } from '@storybook/react';
import SøkersituasjonSteg from './SøkersituasjonSteg';
import IntlProvider from '../../../intl/IntlProvider';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';
import EsContextStorybookHelper from '../../../storybookHelpers/EsContextStorybookHelper';
import { EsDataType } from '../../../EsDataContext';
import { Path } from '../../../useEsNavigator';

export default {
    title: 'SøkersituasjonSteg',
    component: SøkersituasjonSteg,
    decorators: [withRouterProvider],
    parameters: {
        withRouterDecoratorUrl: Path.SØKERSITUASJON,
    },
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <EsContextStorybookHelper dataTypeToLogWhenChanges={EsDataType.SØKERSITUASJON}>
                <SøkersituasjonSteg />
            </EsContextStorybookHelper>
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
