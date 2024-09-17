import { AttachmentMetadataType } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import { ArbeidsforholdDTO } from './Arbeidsforhold';

export interface AttachmentDTO extends Attachment {
    dokumenterer: {
        type: AttachmentMetadataType;
        arbeidsforhold: ArbeidsforholdDTO;
    };
}
