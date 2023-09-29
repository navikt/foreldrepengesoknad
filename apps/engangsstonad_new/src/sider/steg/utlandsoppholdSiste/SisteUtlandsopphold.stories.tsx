import { StoryFn } from '@storybook/react';
import IntlProvider from 'intl/IntlProvider';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';
import SisteUtlandsopphold from './SisteUtlandsopphold';
import { Path } from 'appData/paths';
import EsContextStorybookHelper from '../../../storybookHelpers/EsContextStorybookHelper';
import { EsDataType } from 'appData/EsDataContext';

const utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: true,
    skalBoUtenforNorgeNeste12Mnd: false,
};

export default {
    title: 'SisteUtlandsopphold',
    component: SisteUtlandsopphold,
    decorators: [withRouterProvider],
    parameters: {
        withRouterDecoratorUrl: Path.SISTE_UTENLANDSOPPHOLD,
    },
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <EsContextStorybookHelper
                initialState={{
                    [EsDataType.UTENLANDSOPPHOLD]: utenlandsopphold,
                }}
            >
                <SisteUtlandsopphold />
            </EsContextStorybookHelper>
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
