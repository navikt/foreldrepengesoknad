import { StoryFn } from '@storybook/react';
import IntlProvider from 'intl/IntlProvider';
import FeilsideInfo from './FeilsideInfo';

export default {
    title: 'FeilsideInfo',
    component: FeilsideInfo,
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <FeilsideInfo onChangeLocale={() => undefined} locale="nb" />
        </IntlProvider>
    );
};

export const Default = Template.bind({});
