import {
    Attachment,
    KontoTypeUttak_fpoversikt,
    MorsAktivitet,
    Oppholdsårsak,
    UtsettelsesÅrsak,
    UttakOverføringÅrsak_fpoversikt,
} from '@navikt/fp-types';

import { Arbeidsform } from './Arbeidsform';
import { Forelder } from './Forelder';
import { PeriodeHullÅrsak } from './PeriodeHullÅrsak';
import { PeriodeInfoType } from './PeriodeInfoType';
import { TidsperiodeDate } from './TidsperiodeDate';

export enum Periodetype {
    Uttak = 'uttak',
    Utsettelse = 'utsettelse',
    Opphold = 'opphold',
    Overføring = 'overføring',
    Hull = 'ubegrunnetOpphold',
    Info = 'info',
    PeriodeUtenUttak = 'periodeUtenUttak',
}

export interface PeriodeBase {
    id: string;
    type: Periodetype;
    tidsperiode: TidsperiodeDate;
}

export interface ForeldrepengerFørFødselUttaksperiode extends UttaksperiodeBase {
    konto: 'FORELDREPENGER_FØR_FØDSEL';
    skalIkkeHaUttakFørTermin: boolean;
}

export interface UttaksperiodeBase extends PeriodeBase {
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

export type UtsettelseFormPeriodeType = Utsettelsesperiode | Oppholdsperiode;
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
    årsak: Oppholdsårsak;
    forelder: Forelder;
}

export interface Overføringsperiode extends PeriodeBase {
    type: Periodetype.Overføring;
    konto: KontoTypeUttak_fpoversikt;
    forelder: Forelder;
    årsak: UttakOverføringÅrsak_fpoversikt;
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

export enum OpprinneligSøkt {
    Ferie = 'FERIE',
    Arbeid = 'ARBEID',
    Gradering = 'GRADERING',
}

export interface AvslåttPeriode extends InfoPeriodeBase {
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

export interface UttakAnnenPartInfoPeriode extends InfoPeriodeBase {
    type: Periodetype.Info;
    infotype: PeriodeInfoType.uttakAnnenPart;
    årsak: Oppholdsårsak;
    forelder: Forelder;
    overskrives: true;
    visPeriodeIPlan: boolean;
    ønskerSamtidigUttak?: boolean;
    samtidigUttakProsent?: string;
    gradert?: boolean;
    stillingsprosent?: string;
}

export interface UttakAnnenPartEØSInfoPeriode extends InfoPeriodeBase {
    type: Periodetype.Info;
    infotype: PeriodeInfoType.uttakAnnenPart;
    årsak: Oppholdsårsak;
    forelder: Forelder;
    overskrives: boolean;
    visPeriodeIPlan: boolean;
    trekkdager: number;
}

export interface UtsettelseAnnenPartInfoPeriode extends InfoPeriodeBase {
    type: Periodetype.Info;
    infotype: PeriodeInfoType.utsettelseAnnenPart;
    årsak: UtsettelsesÅrsak;
    forelder: Forelder;
    overskrives: true;
    visPeriodeIPlan: boolean;
}

export type InfoPeriode =
    | AvslåttPeriode
    | UttakAnnenPartInfoPeriode
    | UttakAnnenPartEØSInfoPeriode
    | UtsettelseAnnenPartInfoPeriode;

export interface PeriodeUtenUttak extends PeriodeBase {
    type: Periodetype.PeriodeUtenUttak;
}

export interface PeriodeUtenUttakUtsettelse extends Omit<Utsettelsesperiode, 'forelder'> {
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

export const isHarMorsAktivitet = (periode: Periode): periode is Periode & { morsAktivitetIPerioden: unknown } =>
    'morsAktivitetIPerioden' in periode;

export const isForeldrepengerFørFødselUttaksperiode = (
    periode: Periode,
): periode is ForeldrepengerFørFødselUttaksperiode => {
    return periode.type === Periodetype.Uttak && periode.konto === 'FORELDREPENGER_FØR_FØDSEL';
};

export const isUttakAvFellesperiode = (periode: Periode): periode is Uttaksperiode => {
    return periode.type === Periodetype.Uttak && periode.konto === 'FELLESPERIODE';
};

export const isUttakAvForeldrepengerFørFødsel = (periode: Periode): periode is ForeldrepengerFørFødselUttaksperiode => {
    return periode.type === Periodetype.Uttak && periode.konto === 'FORELDREPENGER_FØR_FØDSEL';
};

export const isUttakAvFedrekvoteMorForSyk = (periode: Periode): periode is Uttaksperiode => {
    return periode.type === Periodetype.Uttak && periode.erMorForSyk === true && periode.konto === 'FEDREKVOTE';
};

export const isOverføringMorInnlagt = (periode: Periode) => {
    return (
        isOverføringsperiode(periode) &&
        periode.årsak === 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER' &&
        periode.forelder === Forelder.farMedmor
    );
};

export const isOverføringMorForSyk = (periode: Periode) => {
    return (
        isOverføringsperiode(periode) &&
        periode.forelder === Forelder.farMedmor &&
        periode.årsak === 'SYKDOM_ANNEN_FORELDER'
    );
};

export const isOverføringFarInnlagt = (periode: Periode) => {
    return (
        isOverføringsperiode(periode) &&
        periode.årsak === 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER' &&
        periode.forelder === Forelder.mor
    );
};

export const isOverføringFarForSyk = (periode: Periode) => {
    return (
        isOverføringsperiode(periode) && periode.forelder === Forelder.mor && periode.årsak === 'SYKDOM_ANNEN_FORELDER'
    );
};

export const isUtsettelseBarnInnlagt = (periode: Periode) => {
    return isUtsettelsesperiode(periode) && periode.årsak === 'INSTITUSJONSOPPHOLD_BARNET';
};

export const isMorStuderer = (periode: Periode) => {
    return isUttaksperiode(periode) && periode.morsAktivitetIPerioden === 'UTDANNING';
};

export const isPeriodeUtenUttakMorStuderer = (periode: Periode) => {
    return isUtsettelsesperiode(periode) && periode.årsak === 'FRI' && periode.morsAktivitetIPerioden === 'UTDANNING';
};

export const isMorJobber = (periode: Periode) => {
    return isUttaksperiode(periode) && periode.morsAktivitetIPerioden === 'ARBEID';
};

export const isPeriodeUtenUttakMorJobber = (periode: Periode) => {
    return isUtsettelsesperiode(periode) && periode.årsak === 'FRI' && periode.morsAktivitetIPerioden === 'ARBEID';
};

export const isMorJobberOgStuderer = (periode: Periode) => {
    return isUttaksperiode(periode) && periode.morsAktivitetIPerioden === 'ARBEID_OG_UTDANNING';
};

export const isPeriodeUtenUttakMorJobberOgStuderer = (periode: Periode) => {
    return (
        isUtsettelsesperiode(periode) &&
        periode.årsak === 'FRI' &&
        periode.morsAktivitetIPerioden === 'ARBEID_OG_UTDANNING'
    );
};

export const isMorIntroprogram = (periode: Periode) => {
    return isUttaksperiode(periode) && periode.morsAktivitetIPerioden === 'INTROPROG';
};

export const isPeriodeUtenUttakMorIntroprogram = (periode: Periode) => {
    return isUtsettelsesperiode(periode) && periode.årsak === 'FRI' && periode.morsAktivitetIPerioden === 'INTROPROG';
};

export const isMorKvalprogram = (periode: Periode) => {
    return isUttaksperiode(periode) && periode.morsAktivitetIPerioden === 'KVALPROG';
};

export const isPeriodeUtenUttakMorKvalprogram = (periode: Periode) => {
    return isUtsettelsesperiode(periode) && periode.årsak === 'FRI' && periode.morsAktivitetIPerioden === 'KVALPROG';
};

export const isForeldrepengerMedAktivitetskravMorInnlagt = (periode: Periode) => {
    return (
        isUttaksperiode(periode) && periode.konto === 'FORELDREPENGER' && periode.morsAktivitetIPerioden === 'INNLAGT'
    );
};

export const isForeldrepengerMedAktivitetskravMorForSyk = (periode: Periode) => {
    return (
        isUttaksperiode(periode) &&
        periode.konto === 'FORELDREPENGER' &&
        periode.morsAktivitetIPerioden === 'TRENGER_HJELP'
    );
};

export const isPeriodeUtenUttakMorForSyk = (periode: Periode) => {
    return (
        isUtsettelsesperiode(periode) && periode.årsak === 'FRI' && periode.morsAktivitetIPerioden === 'TRENGER_HJELP'
    );
};

export const isUtsettelseMorInnlagt = (periode: Periode) => {
    return isUtsettelsesperiode(periode) && periode.årsak === 'INSTITUSJONSOPPHOLD_SØKER';
};

export const isPeriodeUtenUttakMorInnlagt = (periode: Periode) => {
    return isUtsettelsesperiode(periode) && periode.årsak === 'FRI' && periode.morsAktivitetIPerioden === 'INNLAGT';
};

export const isFellesperiodeMorInnlagt = (periode: Periode) => {
    return isUttakAvFellesperiode(periode) && periode.morsAktivitetIPerioden === 'INNLAGT';
};

export const isFellesperiodeMorForSyk = (periode: Periode) => {
    return isUttakAvFellesperiode(periode) && periode.morsAktivitetIPerioden === 'TRENGER_HJELP';
};

export const isUtsettelseMorForSyk = (periode: Periode) => {
    return isUtsettelsesperiode(periode) && periode.årsak === 'SYKDOM';
};

export const isSkalIkkeHaForeldrepengerFørFødselPeriode = (periode: Periode): boolean => {
    return isUttakAvForeldrepengerFørFødsel(periode) && periode.skalIkkeHaUttakFørTermin === true;
};

export const isUtsettelsesperiode = (periode: Periode): periode is Utsettelsesperiode => {
    return periode.type === Periodetype.Utsettelse;
};

export const isUtsettelsePgaFerie = (periode: Periode): periode is Utsettelsesperiode => {
    return isUtsettelsesperiode(periode) && periode.årsak === 'LOVBESTEMT_FERIE';
};

export const isUtsettelsePgaArbeid = (periode: Periode): periode is Utsettelsesperiode => {
    return isUtsettelsesperiode(periode) && periode.årsak === 'ARBEID';
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

export const isUttaksperiodeAnnenpartEøs = (periode: Periode): periode is UttakAnnenPartEØSInfoPeriode => {
    return 'trekkdager' in periode && periode.infotype === PeriodeInfoType.uttakAnnenPart;
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
    return periode.type === Periodetype.Utsettelse && periode.årsak === 'FRI';
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
