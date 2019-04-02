import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Skjemanummer } from './søknad/Søknad';

export interface MissingAttachment {
    index?: number;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    periodeId?: string;
}
