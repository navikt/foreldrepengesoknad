import { AttachmentType } from './AttachmentType';
import { Skjemanummer } from './Skjemanummer';

export enum InnsendingsType {
    SEND_SENERE = 'SEND_SENERE',
}

export interface Attachment {
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
}
