import { Attachment } from '@navikt/fp-types';

export type Vedlegg = {
    vedlegg: Attachment[];
};

export type TerminDokumentasjon = {
    terminbekreftelsedato: string;
} & Vedlegg;

type Dokumentasjon = TerminDokumentasjon | Vedlegg;

export default Dokumentasjon;

export const erTerminDokumentasjon = (dokumentasjon: Dokumentasjon): dokumentasjon is TerminDokumentasjon => {
    if ((dokumentasjon as TerminDokumentasjon).terminbekreftelsedato) {
        return true;
    }
    return false;
};
