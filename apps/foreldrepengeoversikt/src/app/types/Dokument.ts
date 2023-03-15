import { DokumentType } from './DokumentType';

export interface Dokument {
    type: DokumentType;
    mottatt: Date;
    saksnummer: string;
    tittel: string;
    url: string;
}
