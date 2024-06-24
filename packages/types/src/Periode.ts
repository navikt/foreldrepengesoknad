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
    StønadskontoType,
    UtsettelseÅrsakType,
} from '@navikt/fp-constants';

import { Attachment } from './Attachment';
import { TidsperiodeDate } from './TidsperiodeDate';

export interface PeriodeBase {
    id: string;
    type: Periodetype;
    tidsperiode: TidsperiodeDate;
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
    angittAvAnnenPart?: boolean;
    opprinneligSøkt?: OpprinneligSøkt;
}

export type Uttaksperiode = UttaksperiodeBase | ForeldrepengerFørFødselUttaksperiode;

export type UtsettelseFormPeriodeType = Utsettelsesperiode | Oppholdsperiode;
export interface Utsettelsesperiode extends PeriodeBase {
    type: Periodetype.Utsettelse;
    årsak: UtsettelseÅrsakType;
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
    kontoType: StønadskontoType | undefined;
    forelder: Forelder;
    overskrives: true;
    visPeriodeIPlan: boolean;
    kanSlettes: boolean;
    opprinneligSøkt?: OpprinneligSøkt;
}

export interface UttakAnnenPartInfoPeriode extends InfoPeriodeBase {
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

export interface UtsettelseAnnenPartInfoPeriode extends InfoPeriodeBase {
    type: Periodetype.Info;
    infotype: PeriodeInfoType.utsettelseAnnenPart;
    årsak: UtsettelseÅrsakType;
    forelder: Forelder;
    overskrives: true;
    visPeriodeIPlan: boolean;
}

export type InfoPeriode = AvslåttPeriode | UttakAnnenPartInfoPeriode | UtsettelseAnnenPartInfoPeriode;

export interface PeriodeUtenUttak extends PeriodeBase {
    type: Periodetype.PeriodeUtenUttak;
}

export interface PeriodeUtenUttakUtsettelse extends Omit<Utsettelsesperiode, 'forelder'> {
    type: Periodetype.Utsettelse;
    morsAktivitetIPerioden?: MorsAktivitet;
    årsak: UtsettelseÅrsakType.Fri;
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
    return periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel;
};

export const isUttakAvFellesperiode = (periode: Periode): periode is Uttaksperiode => {
    return periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.Fellesperiode;
};

export const isUttakAvForeldrepengerFørFødsel = (periode: Periode): periode is ForeldrepengerFørFødselUttaksperiode => {
    return periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel;
};

export const isUttakAvFedrekvoteMorForSyk = (periode: Periode): periode is Uttaksperiode => {
    return (
        periode.type === Periodetype.Uttak &&
        periode.erMorForSyk === true &&
        periode.konto === StønadskontoType.Fedrekvote
    );
};

export const isOverføringMorInnlagt = (periode: Periode) => {
    return (
        isOverføringsperiode(periode) &&
        periode.årsak === OverføringÅrsakType.institusjonsoppholdAnnenForelder &&
        periode.forelder === Forelder.farMedmor
    );
};

export const isOverføringMorForSyk = (periode: Periode) => {
    return (
        isOverføringsperiode(periode) &&
        periode.forelder === Forelder.farMedmor &&
        periode.årsak === OverføringÅrsakType.sykdomAnnenForelder
    );
};

export const isOverføringFarInnlagt = (periode: Periode) => {
    return (
        isOverføringsperiode(periode) &&
        periode.årsak === OverføringÅrsakType.institusjonsoppholdAnnenForelder &&
        periode.forelder === Forelder.mor
    );
};

export const isOverføringFarForSyk = (periode: Periode) => {
    return (
        isOverføringsperiode(periode) &&
        periode.forelder === Forelder.mor &&
        periode.årsak === OverføringÅrsakType.sykdomAnnenForelder
    );
};

export const isUtsettelseBarnInnlagt = (periode: Periode) => {
    return isUtsettelsesperiode(periode) && periode.årsak === UtsettelseÅrsakType.InstitusjonBarnet;
};

export const isMorStuderer = (periode: Periode) => {
    return isUttaksperiode(periode) && periode.morsAktivitetIPerioden === MorsAktivitet.Utdanning;
};

export const isMorJobber = (periode: Periode) => {
    return isUttaksperiode(periode) && periode.morsAktivitetIPerioden === MorsAktivitet.Arbeid;
};

export const isMorJobberOgStuderer = (periode: Periode) => {
    return isUttaksperiode(periode) && periode.morsAktivitetIPerioden === MorsAktivitet.ArbeidOgUtdanning;
};

export const isMorIntroprogram = (periode: Periode) => {
    return isUttaksperiode(periode) && periode.morsAktivitetIPerioden === MorsAktivitet.Introduksjonsprogrammet;
};

export const isMorKvalprogram = (periode: Periode) => {
    return isUttaksperiode(periode) && periode.morsAktivitetIPerioden === MorsAktivitet.Kvalifiseringsprogrammet;
};

export const isForeldrepengerMedAktivitetskravMorInnlagt = (periode: Periode) => {
    return (
        isUttaksperiode(periode) &&
        periode.konto === StønadskontoType.Foreldrepenger &&
        periode.morsAktivitetIPerioden === MorsAktivitet.Innlagt
    );
};

export const isForeldrepengerMedAktivitetskravMorForSyk = (periode: Periode) => {
    return (
        isUttaksperiode(periode) &&
        periode.konto === StønadskontoType.Foreldrepenger &&
        periode.morsAktivitetIPerioden === MorsAktivitet.TrengerHjelp
    );
};

export const isUtsettelseMorInnlagt = (periode: Periode) => {
    return isUtsettelsesperiode(periode) && periode.årsak === UtsettelseÅrsakType.InstitusjonSøker;
};

export const isFellesperiodeMorInnlagt = (periode: Periode) => {
    return isUttakAvFellesperiode(periode) && periode.morsAktivitetIPerioden === MorsAktivitet.Innlagt;
};

export const isFellesperiodeMorForSyk = (periode: Periode) => {
    return isUttakAvFellesperiode(periode) && periode.morsAktivitetIPerioden === MorsAktivitet.TrengerHjelp;
};

export const isUtsettelseMorForSyk = (periode: Periode) => {
    return isUtsettelsesperiode(periode) && periode.årsak === UtsettelseÅrsakType.Sykdom;
};

export const isSkalIkkeHaForeldrepengerFørFødselPeriode = (periode: Periode): boolean => {
    return isUttakAvForeldrepengerFørFødsel(periode) && periode.skalIkkeHaUttakFørTermin === true;
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

export const isInfoPeriodeAnnenPart = (periode: Periode): periode is InfoPeriode => {
    return (
        periode.type === Periodetype.Info &&
        (periode.infotype === PeriodeInfoType.uttakAnnenPart ||
            periode.infotype === PeriodeInfoType.utsettelseAnnenPart)
    );
};

export const isHull = (periode: Periode): periode is PeriodeHull => {
    return periode.type === Periodetype.Hull;
};

export const isUtsettelseAnnenPart = (periode: Periode): periode is UtsettelseAnnenPartInfoPeriode => {
    return periode.type === Periodetype.Info && periode.infotype === PeriodeInfoType.utsettelseAnnenPart;
};

export const isAvslåttPeriode = (periode: Periode): periode is AvslåttPeriode => {
    return periode.type === Periodetype.Info && periode.infotype === PeriodeInfoType.avslåttPeriode;
};

export const isSlettbarAvslåttPeriode = (periode: Periode): periode is AvslåttPeriode => {
    return isAvslåttPeriode(periode) && periode.kanSlettes;
};

export const isUttakAnnenPart = (periode: Periode): periode is UttakAnnenPartInfoPeriode => {
    return periode.type === Periodetype.Info && periode.infotype === PeriodeInfoType.uttakAnnenPart;
};

export const isPeriodeUtenUttakUtsettelse = (periode: Periode): periode is PeriodeUtenUttakUtsettelse => {
    return periode.type === Periodetype.Utsettelse && periode.årsak === UtsettelseÅrsakType.Fri;
};

export const isPeriodeUtenUttak = (periode: Periode): periode is PeriodeUtenUttak => {
    return periode.type === Periodetype.PeriodeUtenUttak;
};

export const isOverskrivbarPeriode = (periode: Periode): boolean => {
    return (
        (periode.type === Periodetype.Info && periode.overskrives === true) ||
        periode.type === Periodetype.Hull ||
        isPeriodeUtenUttak(periode) ||
        isPeriodeUtenUttakUtsettelse(periode)
    );
};

const isAnnenPartInfoPeriodeOppholdUttak = (periode: InfoPeriode) => {
    return periode.infotype === PeriodeInfoType.uttakAnnenPart;
};

const isAnnenPartInfoPeriodeOppholdUtsettelse = (periode: InfoPeriode) => {
    return periode.infotype === PeriodeInfoType.utsettelseAnnenPart;
};

export const isAnnenPartInfoPeriode = (periode: Periode): periode is UttakAnnenPartInfoPeriode => {
    return (
        periode.type === Periodetype.Info &&
        (isAnnenPartInfoPeriodeOppholdUttak(periode) || isAnnenPartInfoPeriodeOppholdUtsettelse(periode))
    );
};
