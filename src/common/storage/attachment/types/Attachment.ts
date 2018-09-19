import { Skjemanummer } from '../../../../app/types/søknad/Søknad';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';

export interface Attachment {
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
}
