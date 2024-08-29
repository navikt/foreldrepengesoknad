import { AttachmentMetadataType } from '@navikt/fp-constants';

export interface AttachmentMetadataTidsperiode {
    fom: string;
    tom?: string;
}

export type AttachmentMetadata = {
    type: AttachmentMetadataType;
    perioder?: AttachmentMetadataTidsperiode[];
    arbeidsforhold?: any;
};
