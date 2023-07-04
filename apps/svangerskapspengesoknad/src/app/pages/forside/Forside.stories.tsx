import { StoryFn } from '@storybook/react';
import Forside from './Forside';
import withIntlProvider from 'storybook/decorators/withIntl';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';

const defaultExport = {
    title: 'pages/Forside',
    component: Forside,
    decorators: [withIntlProvider, withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

const Template: StoryFn = () => {
    return <Forside />;
};
export const Default = Template.bind({});
