import { StoryFn } from '@storybook/react';
import ScanDocumentInfo from './ScanDocumentInfo';

export default {
    title: 'ScanDocumentInfo',
    component: ScanDocumentInfo,
};

const Template: StoryFn = () => {
    return <ScanDocumentInfo />;
};

export const Default = Template.bind({});
