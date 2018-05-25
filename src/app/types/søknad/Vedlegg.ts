interface Vedlegg {
    omsorgsovertakelse: File[];
    adopsjonsvedtak: File[];
    overtakelsedokumentasjon: File[];
    terminbekreftelse: File[];
    fødselsattest: File[];
}

export interface VedleggMetadata {
    beskrivelse: string;
    skjemanummer: string;
}

export type VedleggPartial = Partial<Vedlegg>;

export default Vedlegg;
