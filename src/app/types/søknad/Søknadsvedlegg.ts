import { Attachment } from '../Attachment';

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
