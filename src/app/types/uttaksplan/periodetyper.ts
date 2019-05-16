import { Tidsperiode, Forelder } from 'common/types';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { RecursivePartial } from '../Partial';

export enum Periodetype {
    'Uttak' = 'uttak',
    'Utsettelse' = 'utsettelse',
    'Opphold' = 'opphold',
    'Overføring' = 'overføring',
    'Hull' = 'ubegrunnetOpphold',
    'Info' = 'info'
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

export enum UtsettelseÅrsakType {
    'Ferie' = 'LOVBESTEMT_FERIE',
    'Arbeid' = 'ARBEID',
    'Sykdom' = 'SYKDOM',
    'InstitusjonSøker' = 'INSTITUSJONSOPPHOLD_SØKER',
    'InstitusjonBarnet' = 'INSTITUSJONSOPPHOLD_BARNET'
}

export enum SaksperiodeUtsettelseÅrsakType {
    'Ferie' = 'FERIE',
    'Arbeid' = 'ARBEID',
    'Sykdom' = 'SYKDOM_SKADE',
    'InstitusjonSøker' = 'SØKER_INNLAGT',
    'InstitusjonBarnet' = 'BARN_INNLAGT'
}

export enum Arbeidsform {
    'arbeidstaker' = 'ARBEIDSTAKER',
    'frilans' = 'FRILANS',
    'selvstendignæringsdrivende' = 'SELVSTENDIG_NÆRINGSDRIVENDE'
}

export enum OppholdÅrsakType {
    'UttakFellesperiodeAnnenForelder' = 'UTTAK_FELLESP_ANNEN_FORELDER',
    'UttakFlerbarnsukerAnnenForelder' = 'UTTAK_FLERBARN_ANNEN_FORELDER',
    'UttakFedrekvoteAnnenForelder' = 'UTTAK_FEDREKVOTE_ANNEN_FORELDER',
    'UttakMødrekvoteAnnenForelder' = 'UTTAK_MØDREKVOTE_ANNEN_FORELDER'
}

export enum OverføringÅrsakType {
    'insititusjonsoppholdAnnenForelder' = 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
    'sykdomAnnenForelder' = 'SYKDOM_ANNEN_FORELDER',
    'aleneomsorg' = 'ALENEOMSORG',
    'ikkeRettAnnenForelder' = 'IKKE_RETT_ANNEN_FORELDER'
}

export enum PeriodeHullÅrsak {
    'Fridag' = 'Fridag',
    'avslåttPeriode' = 'avslåttPeriode'
}

export enum SenEndringÅrsak {
    'Sykdom' = 'SYKDOM',
    'Uttak' = 'UTTAK',
    'SykdomOgUttak' = 'SYKDOM_OG_UTTAK',
    'InstitusjonSøker' = 'INSTITUSJONSOPPHOLD_SØKER',
    'InstitusjonBarnet' = 'INSTITUSJONSOPPHOLD_BARNET',
    'Ingen' = 'INGEN'
}

export enum PeriodeInfoType {
    'avslåttPeriode' = 'avslåttPeriode'
}

export interface Helligdag {
    dato: Date;
    navn: string;
}

export interface PeriodeBase {
    id: string;
    type: Periodetype;
    tidsperiode: Tidsperiode;
    vedlegg?: Attachment[];
}
interface InfoPeriodeBase extends PeriodeBase {
    type: Periodetype.Info;
    infotype: PeriodeInfoType;
    overskrives: boolean;
}

export interface AvslåttPeriode extends InfoPeriodeBase {
    type: Periodetype.Info;
    infotype: PeriodeInfoType.avslåttPeriode;
    avslåttPeriodeType?: Periodetype;
    konto: StønadskontoType;
    forelder: Forelder;
    overskrives: true;
}

export type InfoPeriode = AvslåttPeriode;

export const isAvslåttPeriode = (periode: Periode): periode is AvslåttPeriode => {
    return periode.type === Periodetype.Info && periode.infotype === PeriodeInfoType.avslåttPeriode;
};

export const isInfoPeriode = (periode: Periode): periode is InfoPeriode => {
    return periode.type === Periodetype.Info && periode.overskrives === true;
};

export interface PeriodeHull extends PeriodeBase {
    type: Periodetype.Hull;
    tidsperiode: Tidsperiode;
    årsak?: PeriodeHullÅrsak;
}

export const isHull = (periode: Periode): periode is PeriodeHull => {
    return periode.type === Periodetype.Hull;
};

export interface UttaksperiodeBase extends PeriodeBase {
    type: Periodetype.Uttak;
    konto: StønadskontoType;
    forelder: Forelder;
    morsAktivitetIPerioden?: MorsAktivitet;
    ønskerSamtidigUttak?: boolean;
    samtidigUttakProsent?: number;
    gradert?: boolean;
    stillingsprosent?: number;
    orgnumre?: string[];
    arbeidsformer?: Arbeidsform[];
    erArbeidstaker?: boolean;
    harIkkeAktivitetskrav?: boolean;
    vedlegg?: Attachment[];
    ønskerFlerbarnsdager?: boolean;
    erMorForSyk?: boolean;
}

export interface ForeldrepengerFørFødselUttaksperiode extends UttaksperiodeBase {
    konto: StønadskontoType.ForeldrepengerFørFødsel;
    skalIkkeHaUttakFørTermin: boolean;
}

export type Uttaksperiode = UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode;

export interface Utsettelsesperiode extends PeriodeBase {
    type: Periodetype.Utsettelse;
    årsak: UtsettelseÅrsakType;
    forelder: Forelder;
    morsAktivitetIPerioden?: MorsAktivitet;
    orgnumre?: string[];
    erArbeidstaker: boolean;
    arbeidsformer?: Arbeidsform[];
}

export interface Oppholdsperiode extends PeriodeBase {
    type: Periodetype.Opphold;
    årsak: OppholdÅrsakType;
    forelder: Forelder;
}

export interface Overføringsperiode extends PeriodeBase {
    type: Periodetype.Overføring;
    konto: StønadskontoType;
    forelder: Forelder;
    årsak: OverføringÅrsakType;
}

export type Periode =
    | Uttaksperiode
    | Utsettelsesperiode
    | Oppholdsperiode
    | Overføringsperiode
    | PeriodeHull
    | InfoPeriode;

export interface TilgjengeligStønadskonto {
    konto: StønadskontoType;
    dager: number;
}

export enum MorsAktivitet {
    'Arbeid' = 'ARBEID',
    'Utdanning' = 'UTDANNING',
    'Kvalifiseringsprogrammet' = 'KVALPROG',
    'Introduksjonsprogrammet' = 'INTROPROG',
    'TrengerHjelp' = 'TRENGER_HJELP',
    'Innlagt' = 'INNLAGT',
    'ArbeidOgUtdanning' = 'ARBEID_OG_UTDANNING',
    'Uføre' = 'UFØRE'
}

export function isUttaksperiode(periode: Periode | RecursivePartial<Periode>): periode is Uttaksperiode {
    return periode.type === Periodetype.Uttak;
}

export function isUtsettelsesperiode(periode: Periode | RecursivePartial<Periode>): periode is Utsettelsesperiode {
    return periode.type === Periodetype.Utsettelse;
}

export function isOverføringsperiode(periode: Periode | RecursivePartial<Periode>): periode is Overføringsperiode {
    return periode.type === Periodetype.Overføring;
}

export function isOppholdsperiode(periode: Periode | RecursivePartial<Periode>): periode is Oppholdsperiode {
    return periode.type === Periodetype.Opphold;
}

export function isForeldrepengerFørFødselUttaksperiode(
    periode: Periode | RecursivePartial<Periode>
): periode is ForeldrepengerFørFødselUttaksperiode {
    return periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel;
}

export interface Stønadskontouttak {
    konto: StønadskontoType;
    antallDager: number;
    forelder?: Forelder;
}
