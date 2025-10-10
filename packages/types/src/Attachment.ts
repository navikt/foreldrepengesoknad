import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

import { Dokumenterer, VedleggInnsendingType } from './apiDtoGenerert';

export type Attachment = {
    dokumenterer?: Dokumenterer;
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
