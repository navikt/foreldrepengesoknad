import { Attachment } from './Attachment';
import { Ytelse } from './Ytelse';

export default interface EttersendingDto {
    brukerTekst?: {
        dokumentType: string;
        overskrift: string;
        tekst: string;
    };
    dialogId?: string;
    saksnummer: string;
    type: Ytelse;
    vedlegg: Attachment[];
}
