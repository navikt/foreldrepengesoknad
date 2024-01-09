export enum AttachmentMetadataType {
    BARN = 'BARN',
    OPPTJENING = 'OPPTJENING',
    TILRETTELEGGING = 'TILRETTELEGGING',
    UTTAK = 'UTTAK',
}

interface Tidsperiode {
    fom: string;
    tom: string;
}

export type AttachmentMetadata = {
    type: AttachmentMetadataType;
    perioder?: Tidsperiode[];
    arbeidsforhold?: any;
};
