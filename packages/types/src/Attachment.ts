import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

import { AttachmentMetadata } from './AttachmentMetadata';
import { VedleggInnsendingType } from './apiDtoGenerert';

export type Attachment = {
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
};
