import { Skjemanummer } from '../../../../app/types/søknad/Søknad';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';

export enum InnsendingsType {
    SEND_SENERE = 'SEND_SENERE'
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
}
