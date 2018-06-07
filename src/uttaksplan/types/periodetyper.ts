import { Tidsperiode, Forelder } from '../types';

export enum Periodetype {
    'Stønadsperiode' = 'uttak',
    'Utsettelse' = 'UTSETTELSE',
    'Opphold' = 'OPPHOLD'
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
    'ForeldrepengerFørFødsel' = 'FORELDREPENGER_FØR_FOEDSEL',
    /** Når det kun er en forsørger/forelder */
    'SamtidigUttak' = 'SAMTIDIGUTTAK'
}

export enum UtsettelseÅrsakType {
    'Ferie' = 'LOVBESTEMT_FERIE',
    'Arbeid' = 'ARBEID',
    'Sykdom' = 'SYKDOM',
    'InstitusjonSøker' = 'INSTITUSJONSOPPHOLD_SØKER',
    'InstitusjonBarnet' = 'INSTITUSJONSOPPHOLD_BARNET'
}

export enum OppholdÅrsakType {
    'VenterSøknadFraAnnenForelder' = 'UTTAK_FELLESP_ANNEN_FORELDER',
    'ManglendeSøktPeriode' = 'UTTAK_KVOTE_ANNEN_FORELDER',
    'Ingen' = 'INGEN'
}

export interface Helligdag {
    dato: Date;
    navn: string;
}

export interface PeriodeBase {
    id?: string;
    type: Periodetype;
    tidsperiode: Tidsperiode;
}

export interface Stønadsperiode extends PeriodeBase {
    type: Periodetype.Stønadsperiode;
    konto: StønadskontoType;
    forelder: Forelder;
    låstPeriode?: boolean;
    låstForelder?: boolean;
}

export interface Utsettelsesperiode extends PeriodeBase {
    type: Periodetype.Utsettelse;
    årsak: UtsettelseÅrsakType;
    forelder: Forelder;
    helligdager?: Helligdag[];
    utsettelseAv?: StønadskontoType;
}

export interface Oppholdsperiode extends PeriodeBase {
    type: Periodetype.Opphold;
    årsak: OppholdÅrsakType;
    forelder: Forelder;
}

export type Periode = Stønadsperiode | Utsettelsesperiode | Oppholdsperiode;

export type Perioder = Periode[];
