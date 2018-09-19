import * as React from 'react';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import Lenke from 'nav-frontend-lenker';

export const createListOfAttachmentPreviewLinks = (attachments: Attachment[]) =>
    attachments.map((attachment: Attachment) => (
        <Lenke href={attachment.url!} target="_blank">
            {attachment.filename}
        </Lenke>
    ));
