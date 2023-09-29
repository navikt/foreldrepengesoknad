import { StoryFn } from '@storybook/react';
import IntlProvider from 'intl/IntlProvider';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';
import NesteUtlandsopphold from './NesteUtlandsopphold';
import { Path } from 'appData/paths';
import EsContextStorybookHelper from '../../../storybookHelpers/EsContextStorybookHelper';
import { EsDataType } from 'appData/EsDataContext';

const utenlandsopphold = {
    harBoddUtenforNorgeSiste12Mnd: false,
    skalBoUtenforNorgeNeste12Mnd: true,
};

export default {
    title: 'NesteUtlandsopphold',
    component: NesteUtlandsopphold,
    decorators: [withRouterProvider],
    parameters: {
        withRouterDecoratorUrl: Path.NESTE_UTENLANDSOPPHOLD,
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
                <NesteUtlandsopphold />
            </EsContextStorybookHelper>
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
