import { StoryFn } from '@storybook/react';
import Forside from './Forside';
import withSvangerskapspengerContextProvider from 'storybook/decorators/withSvangerskapspengerContext';
import withRouterProvider from 'storybook/decorators/withRouter';

const defaultExport = {
    title: 'pages/Forside',
    component: Forside,
    decorators: [withSvangerskapspengerContextProvider, withRouterProvider],
};

export default defaultExport;

const Template: StoryFn = () => {
    return <Forside onChangeLocale={() => undefined} locale="nb" />;
};
export const Default = Template.bind({});
