import {
    Arbeidsform,
    Forelder,
    MorsAktivitet,
    OppholdÅrsakType,
    OpprinneligSøkt,
    OverføringÅrsakType,
    PeriodeHullÅrsak,
    PeriodeInfoType,
    Periodetype,
} from '@navikt/fp-constants';

import { Attachment } from './Attachment';
import { TidsperiodeDate } from './TidsperiodeDate';
import { KontoTypeUttak_fpoversikt } from './fpoversiktDtoGenerert';
import { UtsettelsesÅrsak } from './fpsoknadDtoGenerert';

interface PeriodeBase {
    id: string;
    type: Periodetype;
    tidsperiode: TidsperiodeDate;
}

interface ForeldrepengerFørFødselUttaksperiode extends UttaksperiodeBase {
    konto: 'FORELDREPENGER_FØR_FØDSEL';
    skalIkkeHaUttakFørTermin: boolean;
}

interface UttaksperiodeBase extends PeriodeBase {
    type: Periodetype.Uttak;
    konto: KontoTypeUttak_fpoversikt;
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
    angittAvAnnenPart?: boolean;
    opprinneligSøkt?: OpprinneligSøkt;
}

export type Uttaksperiode = UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode;
export interface Utsettelsesperiode extends PeriodeBase {
    type: Periodetype.Utsettelse;
    årsak: UtsettelsesÅrsak;
    forelder: Forelder;
    morsAktivitetIPerioden?: MorsAktivitet;
    erArbeidstaker: boolean;
    bekrefterArbeidIPerioden?: boolean;
}

export interface Oppholdsperiode extends PeriodeBase {
    type: Periodetype.Opphold;
    årsak: OppholdÅrsakType;
    forelder: Forelder;
}

export interface Overføringsperiode extends PeriodeBase {
    type: Periodetype.Overføring;
    konto: KontoTypeUttak_fpoversikt;
    forelder: Forelder;
    årsak: OverføringÅrsakType;
}

interface PeriodeHull extends PeriodeBase {
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

interface AvslåttPeriode extends InfoPeriodeBase {
    type: Periodetype.Info;
    infotype: PeriodeInfoType.avslåttPeriode;
    avslåttPeriodeType?: Periodetype;
    kontoType: KontoTypeUttak_fpoversikt | undefined;
    forelder: Forelder;
    overskrives: true;
    visPeriodeIPlan: boolean;
    kanSlettes: boolean;
    opprinneligSøkt?: OpprinneligSøkt;
}

interface UttakAnnenPartInfoPeriode extends InfoPeriodeBase {
    type: Periodetype.Info;
    infotype: PeriodeInfoType.uttakAnnenPart;
    årsak: OppholdÅrsakType;
    forelder: Forelder;
    overskrives: true;
    visPeriodeIPlan: boolean;
    ønskerSamtidigUttak?: boolean;
    samtidigUttakProsent?: string;
    gradert?: boolean;
    stillingsprosent?: string;
}

interface UtsettelseAnnenPartInfoPeriode extends InfoPeriodeBase {
    type: Periodetype.Info;
    infotype: PeriodeInfoType.utsettelseAnnenPart;
    årsak: UtsettelsesÅrsak;
    forelder: Forelder;
    overskrives: true;
    visPeriodeIPlan: boolean;
}

export type InfoPeriode = AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode;

export interface PeriodeUtenUttak extends PeriodeBase {
    type: Periodetype.PeriodeUtenUttak;
}

interface PeriodeUtenUttakUtsettelse extends Omit<Utsettelsesperiode, 'forelder'> {
    type: Periodetype.Utsettelse;
    morsAktivitetIPerioden?: MorsAktivitet;
    årsak: 'FRI';
    erArbeidstaker: boolean;
    forelder: Forelder;
}

export type Periode =
    | Uttaksperiode
    | Utsettelsesperiode
    | Oppholdsperiode
    | Overføringsperiode
    | PeriodeHull
    | PeriodeUtenUttakUtsettelse
    | PeriodeUtenUttak
    | InfoPeriode;

export function isUttaksperiode(periode: Periode): periode is Uttaksperiode {
    return periode.type === Periodetype.Uttak;
}

export const isForeldrepengerFørFødselUttaksperiode = (
    periode: Periode,
): periode is ForeldrepengerFørFødselUttaksperiode => {
    return periode.type === Periodetype.Uttak && periode.konto === 'FORELDREPENGER_FØR_FØDSEL';
};

export const isUtsettelsesperiode = (periode: Periode): periode is Utsettelsesperiode => {
    return periode.type === Periodetype.Utsettelse;
};

export const isInfoPeriode = (periode: Periode): periode is InfoPeriode => {
    return periode.type === Periodetype.Info && periode.overskrives === true;
};

export const isAvslåttPeriode = (periode: Periode): periode is AvslåttPeriode => {
    return periode.type === Periodetype.Info && periode.infotype === PeriodeInfoType.avslåttPeriode;
};

export const isUttakAnnenPart = (periode: Periode): periode is UttakAnnenPartInfoPeriode => {
    return periode.type === Periodetype.Info && periode.infotype === PeriodeInfoType.uttakAnnenPart;
};
