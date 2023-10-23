import { Attachment } from '@navikt/fp-types';

type Vedlegg = {
    vedlegg: Attachment[];
};

export type TerminDokumentasjon = {
    terminbekreftelsedato: string;
} & Vedlegg;

export type AdopsjonDokumentasjon = Vedlegg;

type Dokumentasjon = TerminDokumentasjon | AdopsjonDokumentasjon;

export default Dokumentasjon;

export const erTerminDokumentasjon = (dokumentasjon: Dokumentasjon): dokumentasjon is TerminDokumentasjon => {
    if ((dokumentasjon as TerminDokumentasjon).terminbekreftelsedato) {
        return true;
    }
    return false;
};
