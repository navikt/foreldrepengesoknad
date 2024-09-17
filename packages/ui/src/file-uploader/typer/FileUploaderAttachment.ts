import { FileObject } from '@navikt/ds-react';

import { Attachment } from '@navikt/fp-types';

export type FileUploaderAttachment = {
    attachmentData: Attachment;
    fileObject: FileObject;
};
