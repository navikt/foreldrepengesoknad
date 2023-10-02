import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IntlProvider from 'intl/IntlProvider';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';

import { Path } from 'appData/paths';
import Velkommen from './Velkommen';

export default {
    title: 'Velkommen',
    component: Velkommen,
    decorators: [withRouterProvider],
    parameters: {
        withRouterDecoratorUrl: Path.VELKOMMEN,
    },
};

const Template: StoryFn<{ startSøknad: (start: boolean) => void }> = ({ startSøknad }) => {
    return (
        <IntlProvider språkkode="nb">
            <Velkommen
                startSøknad={startSøknad}
                onChangeLocale={action('button-click')}
                locale="nb"
                erVelkommen={false}
            />
        </IntlProvider>
    );
};

export const Default = Template.bind({});
Default.args = {
    startSøknad: action('button-click'),
};
