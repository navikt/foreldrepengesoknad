import { StoryFn } from '@storybook/react';
import withIntlProvider from 'storybook/decorators/withIntl';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';
import Barnet from './Barnet';

const defaultExport = {
    title: 'steps/Barnet',
    component: Barnet,
    decorators: [withIntlProvider, withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

const Template: StoryFn = () => {
    return <Barnet />;
};
export const Default = Template.bind({});
