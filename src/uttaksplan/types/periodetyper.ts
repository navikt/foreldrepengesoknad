import { Tidsperiode, Forelder } from '../types';

export enum Periodetype {
    'Stonadsperiode' = 'Stønadsperiode',
    'Utsettelse' = 'Utsettelse'
}

export enum StonadskontoType {
    /** Kvote forbeholdt mor */
    'ModrekvotePakrevd' = 'ModrekvotePakrevd',
    /** Kvote forbeholdt mor */
    'Modrekvote' = 'Modrekvote',
    /** Kvote forbehold medforelder */
    'Fedrekvote' = 'Fedrekvote',
    /** Felleskvote som kan fordeles mellom mor og medforelder */
    'Fellesperiode' = 'Fellesperiode',
    /** Når det kun er en forsørger/forelder */
    'Foreldrepenger' = 'Foreldrepenger',
    /** Mors permisjon før fødsel */
    'ForeldrepengerForFodsel' = 'ForeldrepengerForFodsel'
}

export enum UtsettelseArsakType {
    'Ferie' = 'ferie',
    'Arbeid' = 'arbeid',
    'Sykdom' = 'sykdom'
}

export interface Helligdag {
    dato: Date;
    navn: string;
}

interface PeriodeBase {
    id?: string;
    type: Periodetype;
    tidsperiode: Tidsperiode;
}

export type Stonadskontoer =
    | StonadskontoType.Fedrekvote
    | StonadskontoType.Modrekvote
    | StonadskontoType.ModrekvotePakrevd
    | StonadskontoType.Fellesperiode
    | StonadskontoType.ForeldrepengerForFodsel;

export interface Stonadsperiode extends PeriodeBase {
    type: Periodetype.Stonadsperiode;
    konto: Stonadskontoer;
    forelder: Forelder;
    låstPeriode?: boolean;
    låstForelder?: boolean;
}

export interface Utsettelsesperiode extends PeriodeBase {
    type: Periodetype.Utsettelse;
    arsak: UtsettelseArsakType;
    forelder: Forelder;
    helligdager?: Helligdag[];
}

export type Periode = Stonadsperiode | Utsettelsesperiode;
