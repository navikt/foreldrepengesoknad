import { StoryFn } from '@storybook/react';
import IkkeMyndig, { IkkeMyndigProps } from './IkkeMyndig';
import withIntlProvider from 'storybook/decorators/withIntl';

export default {
    title: 'pages/IkkeMyndig',
    component: IkkeMyndig,
    decorators: [withIntlProvider],
};

const Template: StoryFn<IkkeMyndigProps> = (args: IkkeMyndigProps) => {
    return <IkkeMyndig {...args}></IkkeMyndig>;
};
export const Default = Template.bind({});
Default.args = {
    fornavn: 'Vakker',
};
