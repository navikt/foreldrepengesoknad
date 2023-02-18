import React from 'react';
import { Story } from '@storybook/react';

import AttachmentList from 'app/components/attachment/AttachmentList';
import { Attachment } from 'app/types/Attachment';
import withIntlProvider from '../../decorators/withIntl';

export default {
    title: 'components/AttachmentList',
    component: AttachmentList,
    decorators: [withIntlProvider],
};

const Template: Story<any> = (args) => <AttachmentList {...args} />;

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
