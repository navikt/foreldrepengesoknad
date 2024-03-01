import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

export interface MissingAttachment {
    index?: number;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    periodeId?: string;
}
