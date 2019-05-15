import { QuestionConfig, Questions, QuestionVisibility, questionValueIsOk } from '../../util/questions/Question';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Utsettelsesvariant, UtsettelseFormPeriodeType } from './UtsettelseForm';
import { UtsettelseÅrsakType, Utsettelsesperiode, Periodetype } from '../../types/uttaksplan/periodetyper';
import aktivitetskravMorUtil from 'app/util/domain/aktivitetskravMor';
import { Tidsperiode } from 'common/types';
import { Søknadsinfo } from 'app/selectors/types';

export enum UtsettelseSpørsmålKeys {
    'tidsperiode' = 'tidsperiode',
    'variant' = 'variant',
    'sykdomsårsak' = 'sykdomsårsak',
    'arbeidsplass' = 'arbeidsplass',
    'morsAktivitet' = 'morsAktivitet',
    'ferieinfo' = 'ferieinfo'
}

export interface UtsettelseFormPayload {
    variant: Utsettelsesvariant | undefined;
    periode: UtsettelseFormPeriodeType;
    søknadsinfo: Søknadsinfo;
}

export type UtsettelseSpørsmålVisibility = QuestionVisibility<UtsettelseSpørsmålKeys>;

const Sp = UtsettelseSpørsmålKeys;

const skalViseSpørsmålOmMorsAktivitet = (payload: UtsettelseFormPayload): boolean => {
    const { variant, søknadsinfo, periode } = payload;
    const erRelevant = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(
        søknadsinfo.søker.erFarEllerMedmor,
        søknadsinfo.annenForelder
    );

    if (variant === undefined || erRelevant === false) {
        return false;
    }
    if (periode.type === Periodetype.Utsettelse) {
        if (
            variant === Utsettelsesvariant.Ferie ||
            (variant === Utsettelsesvariant.Arbeid && harRegistrertArbeidOk(variant, periode as Utsettelsesperiode)) ||
            (variant === Utsettelsesvariant.Sykdom && questionValueIsOk(periode.årsak))
        ) {
            return true;
        }
    }
    return false;
};

const harRegistrertArbeidOk = (variant: Utsettelsesvariant | undefined, periode: Utsettelsesperiode) => {
    return (
        periode.årsak === UtsettelseÅrsakType.Arbeid &&
        variant === Utsettelsesvariant.Arbeid &&
        ((periode.orgnumre !== undefined && periode.orgnumre.length > 0) ||
            (periode.arbeidsformer !== undefined && periode.arbeidsformer.length > 0))
    );
};

export const utsettelseFormConfig: QuestionConfig<UtsettelseFormPayload, UtsettelseSpørsmålKeys> = {
    [Sp.tidsperiode]: {
        isAnswered: ({ periode }) => getValidTidsperiode(periode.tidsperiode as Tidsperiode) !== undefined
    },
    [Sp.variant]: {
        isAnswered: ({ variant }) => questionValueIsOk(variant),
        isIncluded: ({ periode }) => getValidTidsperiode(periode.tidsperiode as Tidsperiode) !== undefined
    },
    [Sp.sykdomsårsak]: {
        isAnswered: ({ periode }) => questionValueIsOk(periode.årsak),
        parentQuestion: Sp.variant,
        isIncluded: ({ variant }) => variant === Utsettelsesvariant.Sykdom
    },
    [Sp.ferieinfo]: {
        isAnswered: () => true,
        isIncluded: ({ variant }) => variant === Utsettelsesvariant.Ferie
    },
    [Sp.arbeidsplass]: {
        isAnswered: ({ variant, periode }) =>
            periode.type === Periodetype.Utsettelse
                ? harRegistrertArbeidOk(variant, periode as Utsettelsesperiode)
                : true,
        parentQuestion: Sp.variant,
        isIncluded: ({ variant }) => variant === Utsettelsesvariant.Arbeid
    },
    [Sp.morsAktivitet]: {
        isAnswered: ({ periode }) => questionValueIsOk((periode as Utsettelsesperiode).morsAktivitetIPerioden),
        isIncluded: (payload) => skalViseSpørsmålOmMorsAktivitet(payload)
    }
};

export const getUtsettelseFormVisibility = (payload: UtsettelseFormPayload): UtsettelseSpørsmålVisibility => {
    return Questions(utsettelseFormConfig).getVisbility(payload);
};
