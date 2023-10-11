import { AttachmentType, Skjemanummer } from '@navikt/fp-common';

export interface MissingAttachment {
    index?: number;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    periodeId?: string;
}
