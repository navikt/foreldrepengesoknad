import { Attachment } from '@navikt/fp-types';
import { ArbeidsforholdDTO } from './Arbeidsforhold';

export enum DokumentererType {
    TILRETTELEGGING = 'tilrettelegging',
}

export interface AttachmentDTO extends Attachment {
    dokumenterer: {
        type: DokumentererType;
        arbeidsforhold: ArbeidsforholdDTO;
    };
}
