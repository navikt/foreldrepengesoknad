import { Attachment } from './Attachment';
import { Ytelse } from './Ytelse';

export type AttachmentDto = Pick<Attachment, 'id' | 'beskrivelse' | 'skjemanummer' | 'uuid' | 'url'>;

export default interface EttersendingDto {
    brukerTekst?: {
        dokumentType: string;
        overskrift: string;
        tekst: string;
    };
    dialogId?: string;
    saksnummer: string;
    type: Ytelse;
    vedlegg: AttachmentDto[];
}
