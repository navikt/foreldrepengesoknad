import { Attachment } from '@navikt/fp-types';

export const isAttachmentWithError = ({ pending, uploaded, filesize }: Attachment) =>
    (pending === false && uploaded === false) || filesize === 0;
