import React from 'react';

import withIntlProvider from '../../decorators/withIntl';
import Attachment from '../../../app/components/attachment/Attachment';
import { Attachment as AttachmentType } from '../../../app/types/Attachment';

export default {
    title: 'components/Attachment',
    component: Attachment,
    decorators: [withIntlProvider],
};

export const visPendingVedleggUtenUrl = () => (
    <Attachment
        attachment={
            {
                id: '1',
                pending: true,
                filename: 'Dette er et filnavn',
            } as AttachmentType
        }
    />
);

export const visVedleggMedUrl = () => (
    <Attachment
        attachment={
            {
                id: '1',
                pending: false,
                url: 'www.test.no',
                filename: 'Dette er et filnavn',
            } as AttachmentType
        }
    />
);

export const visFilstørrelse = () => (
    <Attachment
        attachment={
            {
                id: '1',
                pending: false,
                url: 'www.test.no',
                filename: 'Dette er et filnavn',
                filesize: 100,
            } as AttachmentType
        }
        showFileSize
    />
);

export const visSlettKnapp = () => (
    <Attachment
        attachment={
            {
                id: '1',
                pending: false,
                url: 'www.test.no',
                filename: 'Dette er et filnavn',
                filesize: 100,
            } as AttachmentType
        }
        onDelete={() => alert('slett')}
    />
);
