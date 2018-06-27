import { Tidsperiode, Forelder } from '../types';

export enum Periodetype {
    'Uttak' = 'uttak',
    'Utsettelse' = 'UTSETTELSE',
    'Opphold' = 'OPPHOLD'
}

export enum StønadskontoType {
    /** Mors del før termin */
    // 'MorsDelFørTermin' = 'MORS_DEL_FØR_TERMIN',
    // /** Mors del */
    // 'MorsDel' = 'MORS_DEL',
    // /** Mors del */
    // 'FarsDel' = 'FARS_DEL',
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
    'SamtidigUttak' = 'SAMTIDIGUTTAK'
}

export enum UtsettelseÅrsakType {
    'Ferie' = 'LOVBESTEMT_FERIE',
    'Arbeid' = 'ARBEID',
    'Sykdom' = 'SYKDOM',
    'InstitusjonSøker' = 'INSTITUSJONSOPPHOLD_SØKER',
    'InstitusjonBarnet' = 'INSTITUSJONSOPPHOLD_BARNET'
}

export interface Helligdag {
    dato: Date;
    navn: string;
}

export interface PeriodeBase {
    id?: string;
    type: Periodetype;
    tidsperiode: Tidsperiode;
    endret?: Date; // Timestamp for å kunne prioritere sist endret ved sortering
}

export interface Uttaksperiode extends PeriodeBase {
    type: Periodetype.Uttak;
    konto: StønadskontoType;
    forelder: Forelder;
    låstForelder?: boolean;
}

export interface Utsettelsesperiode extends PeriodeBase {
    type: Periodetype.Utsettelse;
    årsak: UtsettelseÅrsakType;
    forelder: Forelder;
    helligdager?: Helligdag[];
}

export interface Oppholdsperiode extends PeriodeBase {
    type: Periodetype.Opphold;
}

export type Periode = Uttaksperiode | Utsettelsesperiode | Oppholdsperiode;

export type UttakEllerUtsettelseperiode = Uttaksperiode | Utsettelsesperiode;

export interface StønadskontoUttak {
    konto: StønadskontoType;
    dager: number;
}
