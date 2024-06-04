import { AttachmentMetadataType } from '@navikt/fp-constants';

interface Tidsperiode {
    fom: string;
    tom: string;
}

export type AttachmentMetadata = {
    type: AttachmentMetadataType;
    perioder?: Tidsperiode[];
    arbeidsforhold?: any;
};
