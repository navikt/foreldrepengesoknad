export enum AttachmentMetadataType {
    BARN = 'BARN',
    OPPTJENING = 'OPPTJENING',
    TILRETTELEGGING = 'TILRETTELEGGING',
    UTTAK = 'UTTAK',
}

export type AttachmentMetadata = {
    type: AttachmentMetadataType;
    perioder?: any[];
    arbeidsforhold?: any;
};
