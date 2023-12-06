export enum AttachmentMetadataType {
    UTTAK = 'UTTAK',
    TILRETTELEGGING = 'TILRETTELEGGING',
}

export type AttachmentMetadata = {
    type: AttachmentMetadataType;
    perioder?: any[];
    arbeidsforhold?: any;
};
