import { StoryFn } from '@storybook/react';
import Forside from './Forside';
import withIntlProvider from 'storybook/decorators/withIntl';

const defaultExport = {
    title: 'pages/Forside',
    component: Forside,
    decorators: [withIntlProvider],
};

export default defaultExport;

const Template: StoryFn = () => {
    return <Forside />;
};
export const Default = Template.bind({});
