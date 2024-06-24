import { AttachmentType, InnsendingsType, Skjemanummer } from '@navikt/fp-constants';

import { AttachmentMetadata } from './AttachmentMetadata';

export type Attachment = {
    dokumenterer?: AttachmentMetadata;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType?: InnsendingsType;
    error?: any;
    beskrivelse?: string;
};
