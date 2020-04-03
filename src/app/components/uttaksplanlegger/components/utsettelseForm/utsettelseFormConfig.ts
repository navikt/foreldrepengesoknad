import { QuestionConfig, Questions, QuestionVisibility, questionValueIsOk } from '../../../../util/questions/Question';
import { getValidTidsperiode } from '../../../../util/uttaksplan/Tidsperioden';
import { Utsettelsesvariant, UtsettelseFormPeriodeType } from './UtsettelseForm';
import {
    UtsettelseÅrsakType,
    Utsettelsesperiode,
    Periodetype,
    isUtsettelsesperiode,
    Arbeidsform
} from '../../../../types/uttaksplan/periodetyper';
import aktivitetskravMorUtil from 'app/util/domain/aktivitetskravMor';
import { Tidsperiode } from 'common/types';
import { Søknadsinfo } from 'app/selectors/types';
import { getSamletStillingsprosentForArbeidsforhold } from 'app/util/domain/arbeidsforhold';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

export enum UtsettelseSpørsmålKeys {
    'tidsperiode' = 'tidsperiode',
    'variant' = 'variant',
    'sykdomsårsak' = 'sykdomsårsak',
    'arbeidsplass' = 'arbeidsplass',
    'morsAktivitet' = 'morsAktivitet',
    'ferieinfo' = 'ferieinfo',
    'avtaltFulltidVedDeltid' = 'avtaltFulltidVedDeltid',
    'hvØvelse' = 'hvØvelse',
    'navTiltak' = 'navTiltak'
}

export interface UtsettelseFormPayload {
    variant: Utsettelsesvariant | undefined;
    periode: UtsettelseFormPeriodeType;
    søknadsinfo: Søknadsinfo;
    arbeidsforhold: Arbeidsforhold[];
}

export type UtsettelseSpørsmålVisibility = QuestionVisibility<UtsettelseSpørsmålKeys>;

const Sp = UtsettelseSpørsmålKeys;

const skalViseSpørsmålOmMorsAktivitet = (payload: UtsettelseFormPayload): boolean => {
    const { variant, søknadsinfo, periode } = payload;
    const erRelevant = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(
        søknadsinfo.søker.erFarEllerMedmor,
        søknadsinfo.annenForelder
    );

    if (
        variant === undefined ||
        erRelevant === false ||
        søknadsinfo.søker.erAleneOmOmsorg ||
        søknadsinfo.annenForelder.kanIkkeOppgis
    ) {
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

const harValgtFrilansEllerSelvstendig = (arbeidsformer: Arbeidsform[]): boolean =>
    arbeidsformer.some(
        (arbeidsform) => arbeidsform === Arbeidsform.frilans || arbeidsform === Arbeidsform.selvstendignæringsdrivende
    );

const harValgtArbeidsformerMedDeltid = (periode: Utsettelsesperiode, arbeidsforhold: Arbeidsforhold[]) => {
    const { arbeidsformer, orgnumre } = periode;

    if (arbeidsformer === undefined || harValgtFrilansEllerSelvstendig(arbeidsformer) || orgnumre === undefined) {
        return false;
    }
    return getSamletStillingsprosentForArbeidsforhold(orgnumre, arbeidsforhold) < 100;
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
    [Sp.avtaltFulltidVedDeltid]: {
        isAnswered: ({ periode }) =>
            isUtsettelsesperiode(periode) && periode.harAvtaleOmFulltidForDeltidsstilling !== undefined,
        parentQuestion: Sp.arbeidsplass,
        isIncluded: ({ periode, arbeidsforhold }) =>
            isUtsettelsesperiode(periode) ? harValgtArbeidsformerMedDeltid(periode, arbeidsforhold) : false
    },
    [Sp.morsAktivitet]: {
        isAnswered: ({ periode }) => questionValueIsOk((periode as Utsettelsesperiode).morsAktivitetIPerioden),
        isIncluded: (payload) => skalViseSpørsmålOmMorsAktivitet(payload)
    },
    [Sp.hvØvelse]: {
        isAnswered: () => true,
        isIncluded: ({ variant }) => variant === Utsettelsesvariant.HvØvelse
    },
    [Sp.navTiltak]: {
        isAnswered: () => true,
        isIncluded: ({ variant }) => variant === Utsettelsesvariant.NavTiltak
    }
};

export const getUtsettelseFormVisibility = (payload: UtsettelseFormPayload): UtsettelseSpørsmålVisibility => {
    return Questions(utsettelseFormConfig).getVisbility(payload);
};
