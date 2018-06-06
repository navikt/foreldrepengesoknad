import { Tidsperiode, Forelder } from '../types';

export enum Periodetype {
    'Stonadsperiode' = 'STØNADSPERIODE',
    'Utsettelse' = 'UTSETTELSE',
    'Opphold' = 'OPPHOLD',
    'TaptPeriode' = 'TAPT_PERIODE'
}

export enum StønadskontoTyre {
    /** Kvote forbeholdt mor */
    'Modrekvote' = 'MØDREKVOTE',
    /** Kvote forbehold medforelder */
    'Fedrekvote' = 'FEDREKVOTE',
    /** Felleskvote som kan fordeles mellom mor og medforelder */
    'Fellesperiode' = 'FELLESPERIODE',
    /** Når det kun er en forsørger/forelder */
    'Foreldrepenger' = 'FORELDREPENGER'
}

export enum UtsettelseÅrsakType {
    'Ferie' = 'FERIE',
    'Arbeid' = 'ARBEID',
    'SykdomSkade' = 'SYKDOM_SKADE',
    'InnlagtBarn' = 'INNLAGT_BARN'
}

export enum OppholdÅrsakType {
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

export interface Stønadsperiode extends PeriodeBase {
    type: Periodetype.Stonadsperiode;
    konto: StønadskontoTyre;
    forelder: Forelder;
    låstPeriode?: boolean;
    låstForelder?: boolean;
}

export interface Utsettelsesperiode extends PeriodeBase {
    type: Periodetype.Utsettelse;
    årsak: UtsettelseÅrsakType;
    forelder: Forelder;
    helligdager?: Helligdag[];
}

export interface Oppholdseriode extends PeriodeBase {
    type: Periodetype.Opphold;
    årsak: OppholdÅrsakType;
}

export interface TaptPeriode extends PeriodeBase {
    type: Periodetype.TaptPeriode;
    forelder: Forelder;
}

export type Periode = Stønadsperiode | Utsettelsesperiode | TaptPeriode;
export type Perioder = Periode[];
