import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

import { Dokumenterer, InnsendingType } from './fpsoknadDtoGenerert';

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
    innsendingsType: InnsendingType;
    error?: any;
    beskrivelse?: string;
};
