import { Attachment } from '@navikt/fp-types';

export const isAttachmentWithError = ({ pending, uploaded, filesize }: Attachment) =>
    (!pending && !uploaded) || filesize === 0;
