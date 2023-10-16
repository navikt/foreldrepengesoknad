import { AttachmentType } from './AttachmentType';
import { Skjemanummer } from './Skjemanummer';

export interface MissingAttachment {
    index?: number;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    periodeId?: string;
}
