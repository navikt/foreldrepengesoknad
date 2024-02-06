import { StønadskontoType } from '@navikt/fp-common';

export enum FordelingEier {
    Mor = 'MOR',
    FarMedmor = 'FARMEDMOR',
    Felles = 'FELLES',
}

export enum FordelingFargekode {
    SØKER_MOR = 'søker-mor',
    SØKER_FAR = 'søker-far',
    ANNEN_PART_MOR = 'annen-part-mor',
    ANNEN_PART_FAR = 'annen-part-far',
    FELLESPERIODE_BRUKT_AV_FAR = 'fellesperiode-brukt-av-far',
    FELLESPERIODE_BRUKT_AV_MOR = 'fellesperiode-brukt-av-mor',
    FEDREKVOTE_BRUKT_AV_MOR = 'fedrekvote-brukt-av-mor',
    MØDREKVOTE_BRUKT_AV_FAR = 'mødrekvote-brukt-av-far',
    IKKE_TILDELT = 'ikke-tildelt',
}

export interface FordelingDager {
    antallDager: number;
    fargekode: FordelingFargekode;
}

export interface DelInformasjon {
    eier: FordelingEier;
    sumDager: number;
    fordelingDager: FordelingDager[];
    fordelingInfo: React.ReactNode[];
}

export interface FordelingGrafInfo {
    antallDager: number;
    konto: StønadskontoType;
    eier: FordelingEier;
    fargekode: FordelingFargekode;
    beskrivelse: string;
}
