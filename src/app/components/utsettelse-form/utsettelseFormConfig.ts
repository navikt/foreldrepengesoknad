import { QuestionConfig, Questions, QuestionVisibility, questionIsAnswered } from '../../util/questions/Question';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Utsettelsesvariant, UtsettelseperiodeFormPeriodeType } from './UtsettelseForm';
import { Tidsperiode } from 'nav-datovelger';
import { UtsettelseÅrsakType, Utsettelsesperiode, Oppholdsperiode } from '../../types/uttaksplan/periodetyper';

export enum UtsettelseSpørsmålKeys {
    'tidsperiode' = 'tidsperiode',
    'variant' = 'variant',
    'sykdomsårsak' = 'sykdomsårsak',
    'arbeidsplass' = 'arbeidsplass',
    'morsAktivitet' = 'morsAktivitet',
    'oppholdsårsak' = 'oppholdsårsak',
    'ferieinfo' = 'ferieinfo'
}

export interface UtsettelseFormPayload {
    variant: Utsettelsesvariant | undefined;
    periode: UtsettelseperiodeFormPeriodeType;
    søkerErAleneOmOmsorg: boolean;
    søkerErFarEllerMedmor: boolean;
}

export type UtsettelseSpørsmålVisibility = QuestionVisibility<UtsettelseSpørsmålKeys>;

const Sp = UtsettelseSpørsmålKeys;

const harRegistrertArbeidOk = (variant: Utsettelsesvariant | undefined, periode: UtsettelseperiodeFormPeriodeType) =>
    periode.årsak === UtsettelseÅrsakType.Arbeid &&
    variant === Utsettelsesvariant.Arbeid &&
    (questionIsAnswered(periode.orgnr) || questionIsAnswered(periode.selvstendigNæringsdrivendeEllerFrilans));

export const utsettelseFormConfig: QuestionConfig<UtsettelseFormPayload, UtsettelseSpørsmålKeys> = {
    [Sp.tidsperiode]: {
        isAnswered: ({ periode }) => getValidTidsperiode(periode.tidsperiode as Tidsperiode) !== undefined
    },
    [Sp.variant]: {
        isAnswered: ({ variant }) => questionIsAnswered(variant),
        parentQuestion: Sp.tidsperiode
    },
    [Sp.sykdomsårsak]: {
        isAnswered: ({ periode }) => questionIsAnswered(periode.årsak),
        condition: ({ variant }) => variant === Utsettelsesvariant.Sykdom
    },
    [Sp.ferieinfo]: {
        isAnswered: () => true,
        condition: ({ variant }) => variant === Utsettelsesvariant.Ferie
    },
    [Sp.arbeidsplass]: {
        isAnswered: ({ variant, periode }) => harRegistrertArbeidOk(variant, periode),
        condition: ({ variant }) => variant === Utsettelsesvariant.Arbeid
    },
    [Sp.morsAktivitet]: {
        isAnswered: ({ periode }) => questionIsAnswered((periode as Utsettelsesperiode).morsAktivitetIPerioden),
        condition: ({ variant, periode, søkerErAleneOmOmsorg, søkerErFarEllerMedmor }) =>
            variant === Utsettelsesvariant.Ferie ||
            (periode.årsak === UtsettelseÅrsakType.Arbeid &&
                variant !== undefined &&
                harRegistrertArbeidOk(variant, periode) &&
                søkerErAleneOmOmsorg === false &&
                søkerErFarEllerMedmor === true)
    },
    [Sp.oppholdsårsak]: {
        isAnswered: ({ periode }) => questionIsAnswered((periode as Oppholdsperiode).årsak),
        condition: ({ variant }) => variant === Utsettelsesvariant.UttakAnnenForelder
    }
};

export const getUtsettelseFormVisibility = (
    variant: Utsettelsesvariant | undefined,
    periode: UtsettelseperiodeFormPeriodeType,
    søkerErAleneOmOmsorg: boolean,
    søkerErFarEllerMedmor: boolean
): UtsettelseSpørsmålVisibility => {
    return Questions(utsettelseFormConfig).getVisbility({
        variant,
        periode,
        søkerErAleneOmOmsorg,
        søkerErFarEllerMedmor
    });
};
