import { Attachment } from '@navikt/fp-types';

export type Vedlegg = {
    vedlegg: Attachment[];
};

export type TerminDokumentasjon = {
    terminbekreftelsedato: string;
} & Vedlegg;

export type Dokumentasjon = TerminDokumentasjon | Vedlegg;

export const erTerminDokumentasjon = (dokumentasjon: Dokumentasjon): dokumentasjon is TerminDokumentasjon => {
    return 'terminbekreftelsedato' in dokumentasjon;
};
