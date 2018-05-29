import { Attachment } from '../Attachment';

export type SøknadsvedleggKeys =
    | 'omsorgsovertakelse'
    | 'adopsjonsvedtak'
    | 'overtakelsedokumentasjon'
    | 'terminbekreftelse'
    | 'fødselsattest';

interface Søknadsvedlegg {
    omsorgsovertakelse: Attachment[];
    adopsjonsvedtak: Attachment[];
    overtakelsedokumentasjon: Attachment[];
    terminbekreftelse: Attachment[];
    fødselsattest: Attachment[];
}

export interface SøknadsvedleggMetadata {
    beskrivelse: string;
    skjemanummer: string;
}

export type SøknadsvedleggPartial = Partial<Søknadsvedlegg>;

export default Søknadsvedlegg;
