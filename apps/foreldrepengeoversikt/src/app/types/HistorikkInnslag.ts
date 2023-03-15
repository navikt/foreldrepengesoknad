import { HendelseType } from './HendelseType';

export interface HistorikkInnslag {
    aktørId: string;
    fnr: string;
    journalpostId: string;
    opprettet: string;
    saksnr: string;
    type: HistorikkInnslagType;
}

export enum HistorikkInnslagType {
    'søknad' = 'søknad',
    'inntekt' = 'inntekt',
    'minidialog' = 'minidialog',
}

export interface MinidialogInnslag extends HistorikkInnslag {
    aktiv: boolean;
    dialogId: string;
    gyldigTil: string;
    hendelse: HendelseType;
    tekst: string;
    type: HistorikkInnslagType.minidialog;
}
