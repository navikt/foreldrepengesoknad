interface Vedlegg {
    omsorgsovertakelse: File[];
}

export interface VedleggMetadata {
    beskrivelse: string;
    skjemanummer: string;
}

export type VedleggPartial = Partial<Vedlegg>;

export default Vedlegg;
