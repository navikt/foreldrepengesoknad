import { Tidsperiode, Forelder, StønadskontoType } from 'common/types';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { RecursivePartial } from '../Partial';
import { PeriodeResultatType } from '../EksisterendeSak';

export { TilgjengeligStønadskonto } from 'shared/types';
export { StønadskontoType } from 'common/types';

export interface Uttaksinfo {
    antallUttaksdager: number;
    antallFridager: number;
    antallUttaksdagerBrukt: number;
}

export enum Periodetype {
    'Uttak' = 'uttak',
    'Utsettelse' = 'utsettelse',
    'Opphold' = 'opphold',
    'Overføring' = 'overføring',
    'Hull' = 'ubegrunnetOpphold',
    'Info' = 'info'
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
    'UttakFedrekvoteAnnenForelder' = 'UTTAK_FEDREKVOTE_ANNEN_FORELDER',
    'UttakMødrekvoteAnnenForelder' = 'UTTAK_MØDREKVOTE_ANNEN_FORELDER',
    'UttakForelderpengerFørFødsel' = 'UTTAK_FORELDREPENGER_FØR_FØDSEL_ANNEN_FORELDER'
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
    'Arbeid' = 'ARBEID',
    'ArbeidOgUttak' = 'ARBEID_OG_UTTAK',
    'Ingen' = 'INGEN'
}

export enum PeriodeInfoType {
    'avslåttPeriode' = 'avslåttPeriode',
    'uttakAnnenPart' = 'uttakAnnenPart',
    'utsettelseAnnenPart' = 'utsettelseAnnenPart'
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
    visPeriodeIPlan: boolean;
}

export interface AvslåttPeriode extends InfoPeriodeBase {
    type: Periodetype.Info;
    infotype: PeriodeInfoType.avslåttPeriode;
    avslåttPeriodeType?: Periodetype;
    stønadskonto: StønadskontoType;
    forelder: Forelder;
    overskrives: true;
    visPeriodeIPlan: boolean;
}

export interface UttakAnnenPartInfoPeriode extends InfoPeriodeBase {
    type: Periodetype.Info;
    infotype: PeriodeInfoType.uttakAnnenPart;
    årsak: OppholdÅrsakType;
    forelder: Forelder;
    overskrives: true;
    resultatType: PeriodeResultatType;
    visPeriodeIPlan: boolean;
    ønskerSamtidigUttak?: boolean;
    samtidigUttakProsent?: string;
    gradert?: boolean;
    stillingsprosent?: string;
}

export interface UtsettelseAnnenPartInfoPeriode extends InfoPeriodeBase {
    type: Periodetype.Info;
    infotype: PeriodeInfoType.utsettelseAnnenPart;
    årsak: UtsettelseÅrsakType;
    forelder: Forelder;
    overskrives: true;
    resultatType: PeriodeResultatType;
    visPeriodeIPlan: boolean;
}

export const isAnnenPartInfoPeriode = (periode: Periode): periode is UttakAnnenPartInfoPeriode => {
    return (
        periode.type === Periodetype.Info &&
        (isAnnenPartInfoPeriodeOppholdUttak(periode) || isAnnenPartInfoPeriodeOppholdUtsettelse(periode))
    );
};

const isAnnenPartInfoPeriodeOppholdUttak = (periode: InfoPeriode) => {
    return periode.infotype === PeriodeInfoType.uttakAnnenPart;
};

const isAnnenPartInfoPeriodeOppholdUtsettelse = (periode: InfoPeriode) => {
    return periode.infotype === PeriodeInfoType.utsettelseAnnenPart;
};

export type InfoPeriode = AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode;

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
    samtidigUttakProsent?: string;
    gradert?: boolean;
    stillingsprosent?: string;
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
    harAvtaleOmFulltidForDeltidsstilling?: boolean;
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

export function isUttakAvFellesperiode(periode: Periode | RecursivePartial<Periode>): periode is Uttaksperiode {
    return periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.Fellesperiode;
}

export function isUtsettelsesperiode(periode: Periode | RecursivePartial<Periode>): periode is Utsettelsesperiode {
    return periode.type === Periodetype.Utsettelse;
}

export function isUtsettelsePgaFerie(periode: Periode | RecursivePartial<Periode>): periode is Utsettelsesperiode {
    return isUtsettelsesperiode(periode) && periode.årsak === UtsettelseÅrsakType.Ferie;
}

export function isUtsettelsePgaArbeid(periode: Periode | RecursivePartial<Periode>): periode is Utsettelsesperiode {
    return isUtsettelsesperiode(periode) && periode.årsak === UtsettelseÅrsakType.Arbeid;
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

export const isOverskrivbarPeriode = (periode: Periode): boolean => {
    return (periode.type === Periodetype.Info && periode.overskrives === true) || periode.type === Periodetype.Hull;
};

export const isUttakAnnenPart = (periode: Periode): periode is UttakAnnenPartInfoPeriode => {
    return periode.type === Periodetype.Info && periode.infotype === PeriodeInfoType.uttakAnnenPart;
};

export const isUtsettelseAnnenPart = (periode: Periode): periode is UtsettelseAnnenPartInfoPeriode => {
    return periode.type === Periodetype.Info && periode.infotype === PeriodeInfoType.utsettelseAnnenPart;
};

export interface Stønadskontouttak {
    konto: StønadskontoType;
    dager: number;
}
