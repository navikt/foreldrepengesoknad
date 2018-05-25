import { Tidsperiode, Forelder } from '../types';

export enum Periodetype {
    'Stonadsperiode' = 'STØNADSPERIODE',
    'Utsettelse' = 'UTSETTELSE',
    'Opphold' = 'OPPHOLD'
}

export enum StonadskontoType {
    /** Kvote forbeholdt mor */
    'ModrekvotePakrevd' = 'ModrekvotePakrevd',
    /** Kvote forbeholdt mor */
    'Modrekvote' = 'MØDREKVOTE',
    /** Kvote forbehold medforelder */
    'Fedrekvote' = 'FEDREKVOTE',
    /** Felleskvote som kan fordeles mellom mor og medforelder */
    'Fellesperiode' = 'FELLESPERIODE',
    /** Når det kun er en forsørger/forelder */
    'Foreldrepenger' = 'FORELDREPENGER',
    /** Mors permisjon før fødsel */
    'ForeldrepengerForFodsel' = 'ForeldrepengerForFodsel'
}

export enum UtsettelseArsakType {
    'Ferie' = 'FERIE',
    'Arbeid' = 'ARBEID',
    'SykdomSkade' = 'SYKDOM_SKADE',
    'InnlagtBarn' = 'INNLAGT_BARN'
}

export enum OppholdArsakType {
    'VenterSøknadFraAnnenForelder' = 'VENTER_SØKNAD_FRA_ANNEN_FORELDRE',
    'ManglendeSøktPeriode' = 'MANGLENDE_SØKT_PERIODE'
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

export interface OppholdPeriode extends PeriodeBase {
    type: Periodetype.Opphold;
    arsak: OppholdArsakType;
}

export type Periode = Stonadsperiode | Utsettelsesperiode;
