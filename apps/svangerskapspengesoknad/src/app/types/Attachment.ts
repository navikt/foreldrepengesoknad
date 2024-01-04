import { ArbeidsforholdDTO } from './Arbeidsforhold';
import { AttachmentType } from './AttachmentType';
import { Skjemanummer } from './Skjemanummer';

export enum InnsendingsType {
    SEND_SENERE = 'SEND_SENERE',
}

export enum DokumentererType {
    TILRETTELEGGING = 'tilrettelegging',
}

export interface Attachment {
    beskrivelse?: string;
    error?: any;
    file: File;
    filename: string;
    filesize: number;
    id: string;
    innsendingsType?: InnsendingsType;
    pending: boolean;
    skjemanummer: Skjemanummer;
    type: AttachmentType;
    uploaded: boolean;
    url?: string;
    uuid?: string;
}

export interface AttachmentDTO extends Attachment {
    dokumenterer: {
        type: DokumentererType;
        arbeidsforhold: ArbeidsforholdDTO;
    };
}
