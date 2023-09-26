import { StoryFn } from '@storybook/react';
import IntlProvider from 'intl/IntlProvider';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';
import FeilsideInfo from './FeilsideInfo';

export default {
    title: 'FeilsideInfo',
    component: FeilsideInfo,
    decorators: [withRouterProvider],
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <FeilsideInfo onChangeLocale={() => undefined} locale="nb" />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
