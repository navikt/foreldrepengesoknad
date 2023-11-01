import { Skjemanummer, AttachmentType } from '@navikt/fp-constants';

export enum InnsendingsType {
    SEND_SENERE = 'SEND_SENERE',
}

export type Attachment = {
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
