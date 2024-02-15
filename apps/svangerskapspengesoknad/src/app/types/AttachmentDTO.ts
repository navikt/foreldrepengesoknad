import { Attachment, AttachmentMetadataType } from '@navikt/fp-types';
import { ArbeidsforholdDTO } from './Arbeidsforhold';

export interface AttachmentDTO extends Attachment {
    dokumenterer: {
        type: AttachmentMetadataType;
        arbeidsforhold: ArbeidsforholdDTO;
    };
}
