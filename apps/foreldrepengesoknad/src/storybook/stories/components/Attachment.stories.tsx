import React from 'react';
import { Story } from '@storybook/react';

import Attachment, { Props } from 'app/components/attachment/Attachment';
import { Attachment as AttachmentType } from 'app/types/Attachment';
import withIntlProvider from '../../decorators/withIntl';

export default {
    title: 'components/Attachment',
    component: Attachment,
    decorators: [withIntlProvider],
};

const Template: Story<Props> = (args) => <Attachment {...args} />;

export const PendingVedleggUtenUrl = Template.bind({});
PendingVedleggUtenUrl.args = {
    attachment: {
        id: '1',
        pending: true,
        filename: 'Dette er et filnavn',
    } as AttachmentType,
};

export const VedleggMedUrl = Template.bind({});
VedleggMedUrl.args = {
    attachment: {
        id: '1',
        pending: false,
        url: 'www.test.no',
        filename: 'Dette er et filnavn',
    } as AttachmentType,
};

export const Filstørrelse = Template.bind({});
Filstørrelse.args = {
    attachment: {
        id: '1',
        pending: false,
        url: 'www.test.no',
        filename: 'Dette er et filnavn',
        filesize: 100,
    } as AttachmentType,
};

export const SlettKnapp = Template.bind({});
SlettKnapp.args = {
    attachment: {
        id: '1',
        pending: false,
        url: 'www.test.no',
        filename: 'Dette er et filnavn',
        filesize: 100,
    } as AttachmentType,
};
