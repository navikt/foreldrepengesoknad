import { TidsperiodeDate } from '@navikt/fp-common';
import { Attachment } from 'app/types/Attachment';
import { Forelder } from 'app/types/Forelder';
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
    tidsperiode: TidsperiodeDate;
    vedlegg?: Attachment[];
}

export interface ForeldrepengerFørFødselUttaksperiode extends UttaksperiodeBase {
    konto: StønadskontoType.ForeldrepengerFørFødsel;
    skalIkkeHaUttakFørTermin: boolean;
}

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

export interface PeriodeHull extends PeriodeBase {
    type: Periodetype.Hull;
    tidsperiode: TidsperiodeDate;
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

export type InfoPeriode = AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode;

export type Periode =
    | Uttaksperiode
    | Utsettelsesperiode
    | Oppholdsperiode
    | Overføringsperiode
    | PeriodeHull
    | InfoPeriode;

export function isUttaksperiode(periode: Periode): periode is Uttaksperiode {
    return periode.type === Periodetype.Uttak;
}

export const isForeldrepengerFørFødselUttaksperiode = (
    periode: Periode
): periode is ForeldrepengerFørFødselUttaksperiode => {
    return periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel;
};

export const isUttakAvFellesperiode = (periode: Periode): periode is Uttaksperiode => {
    return periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.Fellesperiode;
};

export const isUtsettelsesperiode = (periode: Periode): periode is Utsettelsesperiode => {
    return periode.type === Periodetype.Utsettelse;
};

export const isUtsettelsePgaFerie = (periode: Periode): periode is Utsettelsesperiode => {
    return isUtsettelsesperiode(periode) && periode.årsak === UtsettelseÅrsakType.Ferie;
};

export const isUtsettelsePgaArbeid = (periode: Periode): periode is Utsettelsesperiode => {
    return isUtsettelsesperiode(periode) && periode.årsak === UtsettelseÅrsakType.Arbeid;
};

export const isOverføringsperiode = (periode: Periode): periode is Overføringsperiode => {
    return periode.type === Periodetype.Overføring;
};

export const isOppholdsperiode = (periode: Periode): periode is Oppholdsperiode => {
    return periode.type === Periodetype.Opphold;
};

export const isInfoPeriode = (periode: Periode): periode is InfoPeriode => {
    return periode.type === Periodetype.Info && periode.overskrives === true;
};

export const isHull = (periode: Periode): periode is PeriodeHull => {
    return periode.type === Periodetype.Hull;
};
