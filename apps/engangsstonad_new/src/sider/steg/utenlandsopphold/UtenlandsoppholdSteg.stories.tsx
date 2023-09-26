import { StoryFn } from '@storybook/react';
import UtenlandsoppholdSteg from './UtenlandsoppholdSteg';
import IntlProvider from 'intl/IntlProvider';
import withRouterProvider from 'fpcommon/storybookHelpers/withRouter';

export default {
    title: 'UtenlandsoppholdSteg',
    component: UtenlandsoppholdSteg,
    decorators: [withRouterProvider],
};

const Template: StoryFn<any> = () => {
    return (
        <IntlProvider språkkode="nb">
            <UtenlandsoppholdSteg />
        </IntlProvider>
    );
};

export const VisSide = Template.bind({});
