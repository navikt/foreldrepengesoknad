import { StoryFn } from '@storybook/react';
import IntlProvider from 'intl/IntlProvider';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';
import SisteUtlandsopphold from './SisteUtlandsopphold';
import { Path } from 'appData/paths';

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
            <SisteUtlandsopphold />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
