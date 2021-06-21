import { Tidsperiode } from '@navikt/fp-common';
import { Attachment } from 'app/types/Attachment';
import { MorsAktivitet } from './MorsAktivitet';
import { OppholdÅrsakType } from './OppholdÅrsakType';
import { OverføringÅrsakType } from './OverføringÅrsakType';
import { PeriodeHullÅrsak } from './PeriodeHullÅrsak';
import { PeriodeInfoType } from './PeriodeInfoType';
import { PeriodeResultatType } from './PeriodeResultatType';
import { StønadskontoType } from './StønadskontoType';
import { UtsettelseÅrsakType } from './UtsettelseÅrsakType';

export enum Periodetype {
    Uttak = 'uttak',
    Utsettelse = 'utsettelse',
    Opphold = 'opphold',
    Overføring = 'overføring',
    Hull = 'ubegrunnetOpphold',
    Info = 'info',
}

export enum Arbeidsform {
    arbeidstaker = 'ARBEIDSTAKER',
    frilans = 'FRILANS',
    selvstendignæringsdrivende = 'SELVSTENDIG_NÆRINGSDRIVENDE',
}

export interface PeriodeBase {
    id: string;
    type: Periodetype;
    tidsperiode: Tidsperiode;
    vedlegg?: Attachment[];
}

export interface ForeldrepengerFørFødselUttaksperiode extends UttaksperiodeBase {
    konto: StønadskontoType.ForeldrepengerFørFødsel;
    skalIkkeHaUttakFørTermin: boolean;
}

export interface UttaksperiodeBase extends PeriodeBase {
    type: Periodetype.Uttak;
    konto: StønadskontoType;
    forelder: 'mor' | 'farMedmor';
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

export type Uttaksperiode = UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode;

export interface Utsettelsesperiode extends PeriodeBase {
    type: Periodetype.Utsettelse;
    årsak: UtsettelseÅrsakType;
    forelder: 'mor' | 'farMedmor';
    morsAktivitetIPerioden?: MorsAktivitet;
    orgnumre?: string[];
    erArbeidstaker: boolean;
    arbeidsformer?: Arbeidsform[];
    harAvtaleOmFulltidForDeltidsstilling?: boolean;
}

export interface Oppholdsperiode extends PeriodeBase {
    type: Periodetype.Opphold;
    årsak: OppholdÅrsakType;
    forelder: 'mor' | 'farMedmor';
}

export interface Overføringsperiode extends PeriodeBase {
    type: Periodetype.Overføring;
    konto: StønadskontoType;
    forelder: 'mor' | 'farMedmor';
    årsak: OverføringÅrsakType;
}

export interface PeriodeHull extends PeriodeBase {
    type: Periodetype.Hull;
    tidsperiode: Tidsperiode;
    årsak?: PeriodeHullÅrsak;
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
    forelder: 'mor' | 'farMedmor';
    overskrives: true;
    visPeriodeIPlan: boolean;
}

export interface UttakAnnenPartInfoPeriode extends InfoPeriodeBase {
    type: Periodetype.Info;
    infotype: PeriodeInfoType.uttakAnnenPart;
    årsak: OppholdÅrsakType;
    forelder: 'mor' | 'farMedmor';
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
    forelder: 'mor' | 'farMedmor';
    overskrives: true;
    resultatType: PeriodeResultatType;
    visPeriodeIPlan: boolean;
}

export type InfoPeriode = AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode;

export type Periode =
    | Uttaksperiode
    | Utsettelsesperiode
    | Oppholdsperiode
    | Overføringsperiode
    | PeriodeHull
    | InfoPeriode;

export type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

export function isUttaksperiode(periode: Periode | RecursivePartial<Periode>): periode is Uttaksperiode {
    return periode.type === Periodetype.Uttak;
}

export function isForeldrepengerFørFødselUttaksperiode(
    periode: Periode | RecursivePartial<Periode>
): periode is ForeldrepengerFørFødselUttaksperiode {
    return periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel;
}
