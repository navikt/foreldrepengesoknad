import { DokumentType } from './DokumentType';

export interface Dokument {
    type: DokumentType;
    mottatt: string;
    saksnummer: string;
    tittel: string;
    url: string;
    journalpostId: string;
    dokumentId: string;
}
