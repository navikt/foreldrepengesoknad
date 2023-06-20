import { StoryFn } from '@storybook/react';
import IkkeMyndig, { IkkeMyndigProps } from './IkkeMyndig';

const defaultExport = {
    title: 'pages/IkkeMyndig',
    component: IkkeMyndig,
};

export default defaultExport;

const Template: StoryFn<IkkeMyndigProps> = (args: IkkeMyndigProps) => {
    return <IkkeMyndig {...args}></IkkeMyndig>;
};
export const Default = Template.bind({}) as any;
Default.args = {
    fornavn: 'Vakker',
};
