import { Tidsperiode, Forelder } from 'common/types';

export enum Periodetype {
    'Uttak' = 'uttak',
    'Utsettelse' = 'utsettelse',
    'Opphold' = 'opphold'
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
    'Flerbarnsuker' = 'FLERBARNSUKER'
}

export enum UtsettelseÅrsakType {
    'Ferie' = 'LOVBESTEMT_FERIE',
    'Arbeid' = 'ARBEID',
    'Sykdom' = 'SYKDOM',
    'InstitusjonSøker' = 'INSTITUSJONSOPPHOLD_SØKER',
    'InstitusjonBarnet' = 'INSTITUSJONSOPPHOLD_BARNET'
}

export enum OppholdÅrsakType {
    'UttakFellesperiodeAnnenForelder' = 'UTTAK_FELLESP_ANNEN_FORELDER',
    'UttakKvoteAnnenForelder' = 'UTTAK_KVOTE_ANNEN_FORELDER'
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

export interface Uttaksperiode extends PeriodeBase {
    type: Periodetype.Uttak;
    konto: StønadskontoType;
    forelder: Forelder;
}

export interface Utsettelsesperiode extends PeriodeBase {
    type: Periodetype.Utsettelse;
    årsak: UtsettelseÅrsakType;
    forelder: Forelder;
    helligdager?: Helligdag[];
    orgnr: string;
    skalJobbeSomFrilansEllerSelvstendigNæringsdrivende: boolean;
}

export interface GradertUttaksperiode extends Uttaksperiode {
    årsak: UtsettelseÅrsakType.Arbeid;
    stillingsprosent: string;
    samtidigGradertUttak: boolean;
    orgnr: string;
    skalJobbeSomFrilansEllerSelvstendigNæringsdrivende: boolean;
}

export interface Oppholdsperiode extends PeriodeBase {
    type: Periodetype.Opphold;
    årsak: OppholdÅrsakType;
}

export type Periode = Uttaksperiode | Utsettelsesperiode | Oppholdsperiode;

export interface TilgjengeligStønadskonto {
    konto: StønadskontoType;
    dager: number;
}
