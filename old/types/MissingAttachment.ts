import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { Skjemanummer } from './søknad/Søknad';

export interface MissingAttachment {
    index?: number;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    periodeId?: string;
}
