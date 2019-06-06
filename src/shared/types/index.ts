import { ForeldreparForelder } from 'shared/types/foreldreparTypes';

export * from '../regler/regelTypes';
export * from './forbrukTypes';
export * from './foreldreparTypes';

export enum Forelder {
    'farMedmor' = 'farMedmor',
    'mor' = 'mor'
}

export interface Forelderinfo {
    navn: string;
    ikonRef: ForeldreparForelder;
}

export interface OmForeldre {
    mor: Forelderinfo;
    farMedmor?: Forelderinfo;
    bareMor: boolean;
    bareFar: boolean;
    forelderVedAleneomsorg?: Forelder;
    erDeltOmsorg: boolean;
}

export interface TilgjengeligeDager {
    dagerTotalt: number;
    dagerForeldrepengerFørFødsel: number;
    dagerEtterTermin: number;
    dagerMor: number;
    dagerFar: number;
    dagerFelles: number;
    flerbarnsdager: number;
    maksDagerMor: number;
    maksDagerFar: number;
    stønadskontoer: TilgjengeligStønadskonto[];
    dagerForeldrepenger: number;
}

export interface TilgjengeligStønadskonto {
    konto: StønadskontoType;
    dager: number;
}

export enum StønadskontoType {
    /** Kvote forbeholdt mor */
    'Mødrekvote' = 'MØDREKVOTE',
    /** Kvote forbehold medforelder */
    'Fedrekvote' = 'FEDREKVOTE',
    /** Felleskvote som kan fordeles mellom mor og medforelder */
    'Fellesperiode' = 'FELLESPERIODE',
    /** Når det kun er en forsørger/forelder */
    'Foreldrepenger' = 'FORELDREPENGER',
    /** Når det kun er en forsørger/forelder */
    'ForeldrepengerFørFødsel' = 'FORELDREPENGER_FØR_FØDSEL',
    /** Når det kun er en forsørger/forelder */
    'SamtidigUttak' = 'SAMTIDIGUTTAK',
    'Flerbarnsdager' = 'FLERBARNSDAGER',
    'AktivitetsfriKvote' = 'AKTIVITETSFRI_KVOTE'
}
