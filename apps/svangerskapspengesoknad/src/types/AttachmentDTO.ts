import { AttachmentMetadataType } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import { Arbeidsforholdstype } from './Tilrettelegging';

export interface AttachmentDTO extends Attachment {
    dokumenterer: {
        type: AttachmentMetadataType;
        arbeidsforhold: {
            id: string;
            type: Arbeidsforholdstype;
        };
    };
}
