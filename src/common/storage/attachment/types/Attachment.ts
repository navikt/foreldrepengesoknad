import { AttachmentType } from '../../../../app/types/søknad/Søknad';

export interface Attachment {
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
}
