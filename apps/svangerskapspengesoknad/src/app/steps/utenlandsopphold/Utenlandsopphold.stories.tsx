import { StoryFn } from '@storybook/react';
import Utenlandsopphold from './Utenlandsopphold';
import withIntlProvider from 'storybook/decorators/withIntl';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';

const defaultExport = {
    title: 'steps/Utenlandsopphold',
    component: Utenlandsopphold,
    decorators: [withIntlProvider, withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

const Template: StoryFn = () => {
    return <Utenlandsopphold />;
};

export const Default = Template.bind({});
