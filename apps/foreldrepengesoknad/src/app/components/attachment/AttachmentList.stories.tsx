import { StoryFn } from '@storybook/react';

import AttachmentList from './AttachmentList';
import { Attachment } from '@navikt/fp-common';

export default {
    title: 'components/AttachmentList',
    component: AttachmentList,
};

const Template: StoryFn<any> = (args) => <AttachmentList {...args} />;

export const Default = Template.bind({});
Default.args = {
    attachments: [
        {
            id: '1',
            filename: 'Dette er et filnavn',
            filesize: 123,
            pending: true,
        },
        {
            id: '2',
            filename: 'Annet filnavn',
            filesize: 456,
            pending: false,
        },
    ] as Attachment[],
};

export const VedleggListeMedFilstørrelse = Template.bind({});
VedleggListeMedFilstørrelse.args = {
    attachments: [
        {
            id: '1',
            filename: 'Dette er et filnavn',
            filesize: 123,
            pending: true,
        },
        {
            id: '2',
            filename: 'Annet filnavn',
            filesize: 456,
            pending: false,
        },
    ] as Attachment[],
    showFileSize: true,
};
