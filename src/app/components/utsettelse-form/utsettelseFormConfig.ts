import { QuestionConfig, Questions, QuestionVisibility, questionIsAnswered } from '../../util/questions/Question';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Utsettelsesvariant, UtsettelseFormPeriodeType } from './UtsettelseForm';
import { Tidsperiode } from 'nav-datovelger';
import { UtsettelseÅrsakType, Utsettelsesperiode, Oppholdsperiode } from '../../types/uttaksplan/periodetyper';
import aktivitetskravMorUtil from '../../util/domain/aktivitetskravMor';

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
    periode: UtsettelseFormPeriodeType;
    søkerErAleneOmOmsorg: boolean;
    søkerErFarEllerMedmor: boolean;
    annenForelderHarRettPåForeldrepenger: boolean;
}

export type UtsettelseSpørsmålVisibility = QuestionVisibility<UtsettelseSpørsmålKeys>;

const Sp = UtsettelseSpørsmålKeys;

const skalViseSpørsmålOmMorsAktivitet = (payload: UtsettelseFormPayload): boolean => {
    const { variant, søkerErFarEllerMedmor, annenForelderHarRettPåForeldrepenger } = payload;
    const erRelevant = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(
        søkerErFarEllerMedmor,
        annenForelderHarRettPåForeldrepenger
    );

    if (variant === undefined || erRelevant === false) {
        return false;
    }
    if (
        variant === Utsettelsesvariant.Ferie ||
        (variant === Utsettelsesvariant.Arbeid && questionIsAnswered(Sp.arbeidsplass)) ||
        (variant === Utsettelsesvariant.Sykdom && questionIsAnswered(Sp.sykdomsårsak)) ||
        (variant === Utsettelsesvariant.UttakAnnenForelder && questionIsAnswered(Sp.oppholdsårsak))
    ) {
        return true;
    }
    return false;
};

const harRegistrertArbeidOk = (variant: Utsettelsesvariant | undefined, periode: UtsettelseFormPeriodeType) =>
    periode.årsak === UtsettelseÅrsakType.Arbeid &&
    variant === Utsettelsesvariant.Arbeid &&
    (questionIsAnswered(periode.orgnr) || questionIsAnswered(periode.selvstendigNæringsdrivendeEllerFrilans));

export const utsettelseFormConfig: QuestionConfig<UtsettelseFormPayload, UtsettelseSpørsmålKeys> = {
    [Sp.tidsperiode]: {
        isAnswered: ({ periode }) => getValidTidsperiode(periode.tidsperiode as Tidsperiode) !== undefined
    },
    [Sp.variant]: {
        isAnswered: ({ variant }) => questionIsAnswered(variant)
    },
    [Sp.sykdomsårsak]: {
        isAnswered: ({ periode }) => questionIsAnswered(periode.årsak),
        parentQuestion: Sp.variant,
        condition: ({ variant }) => variant === Utsettelsesvariant.Sykdom
    },
    [Sp.ferieinfo]: {
        isAnswered: () => true,
        condition: ({ variant }) => variant === Utsettelsesvariant.Ferie
    },
    [Sp.arbeidsplass]: {
        isAnswered: ({ variant, periode }) => harRegistrertArbeidOk(variant, periode),
        parentQuestion: Sp.variant,
        condition: ({ variant }) => variant === Utsettelsesvariant.Arbeid
    },
    [Sp.oppholdsårsak]: {
        isAnswered: ({ periode }) => questionIsAnswered((periode as Oppholdsperiode).årsak),
        parentQuestion: Sp.variant,
        condition: ({ variant }) => variant === Utsettelsesvariant.UttakAnnenForelder
    },
    [Sp.morsAktivitet]: {
        isAnswered: ({ periode }) => questionIsAnswered((periode as Utsettelsesperiode).morsAktivitetIPerioden),
        condition: (payload) => skalViseSpørsmålOmMorsAktivitet(payload)
    }
};

export const getUtsettelseFormVisibility = (payload: UtsettelseFormPayload): UtsettelseSpørsmålVisibility => {
    return Questions(utsettelseFormConfig).getVisbility(payload);
};
