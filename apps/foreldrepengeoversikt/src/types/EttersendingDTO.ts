import { Attachment } from '@navikt/fp-types';

import { Ytelse } from './Ytelse';

export interface EttersendingDto {
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
