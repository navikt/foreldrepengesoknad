import { StoryFn } from '@storybook/react';
import IntlProvider from 'intl/IntlProvider';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';
import NesteUtlandsopphold from './NesteUtlandsopphold';
import { Path } from 'appData/paths';

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
            <NesteUtlandsopphold />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
