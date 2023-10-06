import { Attachment } from 'fpcommon/uploader/typer/Attachment';

type Vedlegg = {
    vedlegg: Attachment[];
};

export type TerminDokumentasjon = {
    terminbekreftelsedato: string;
} & Vedlegg;

export type AdopsjonDokumentasjon = Vedlegg;

type Dokumentasjon = TerminDokumentasjon | AdopsjonDokumentasjon;

export default Dokumentasjon;
