import { hasValue } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import getUttakSkjemaregler, { UttakSkjemaReglerProps } from 'uttaksplan/utils/uttaksskjema/uttakSkjemaregler';
import { PeriodeUttakFormData, PeriodeUttakFormField } from './periodeUttakFormConfig';

interface PeriodeUttakFormQuestionsPayload {
    values: PeriodeUttakFormData;
    regelProps: UttakSkjemaReglerProps;
}

const PeriodeUttakFormConfig: QuestionConfig<PeriodeUttakFormQuestionsPayload, PeriodeUttakFormField> = {
    [PeriodeUttakFormField.fom]: {
        isAnswered: ({ values }) => hasValue(values.fom),
        isIncluded: () => true,
    },
    [PeriodeUttakFormField.tom]: {
        isAnswered: ({ values }) => hasValue(values.tom),
        isIncluded: () => true,
    },
    [PeriodeUttakFormField.hvemSkalTaUttak]: {
        isAnswered: ({ values }) => hasValue(values.hvemSkalTaUttak),
        isIncluded: ({ regelProps }) => regelProps.erDeltUttak,
        visibilityFilter: ({ values }) => isValidTidsperiode({ fom: values.fom, tom: values.tom }),
    },
    [PeriodeUttakFormField.konto]: {
        isAnswered: ({ values }) => hasValue(values.konto),
        isIncluded: ({ regelProps }) => regelProps.erDeltUttak,
        visibilityFilter: ({ values }) => hasValue(values.hvemSkalTaUttak),
    },
    [PeriodeUttakFormField.ønskerFlerbarnsdager]: {
        isAnswered: ({ values }) => values.ønskerFlerbarnsdager !== YesOrNo.UNANSWERED,
        isIncluded: ({ values, regelProps }) =>
            getUttakSkjemaregler(values, regelProps).ønskerFlerbarnsdagerSkalBesvares(),
        visibilityFilter: ({ values }) => hasValue(values.konto),
    },
    [PeriodeUttakFormField.erMorForSyk]: {
        isAnswered: ({ values }) => values.erMorForSyk !== YesOrNo.UNANSWERED,
        isIncluded: ({ values, regelProps }) => getUttakSkjemaregler(values, regelProps).erMorForSykSkalBesvares(),
        visibilityFilter: ({ values }) => values.ønskerFlerbarnsdager !== YesOrNo.UNANSWERED || hasValue(values.konto),
    },
    [PeriodeUttakFormField.samtidigUttak]: {
        isAnswered: ({ values }) => values.samtidigUttak !== YesOrNo.UNANSWERED,
        isIncluded: ({ values, regelProps }) => getUttakSkjemaregler(values, regelProps).samtidigUttakSkalBesvares(),
        visibilityFilter: ({ values }) => hasValue(values.konto),
    },
    [PeriodeUttakFormField.samtidigUttakProsent]: {
        isAnswered: ({ values }) => hasValue(values.samtidigUttakProsent),
        isIncluded: ({ values, regelProps }) => getUttakSkjemaregler(values, regelProps).samtidigUttakSkalBesvares(),
        visibilityFilter: ({ values }) => values.samtidigUttak === YesOrNo.YES,
    },
    [PeriodeUttakFormField.skalHaGradering]: {
        isAnswered: ({ values }) => values.skalHaGradering !== YesOrNo.UNANSWERED,
        isIncluded: ({ values, regelProps }) => getUttakSkjemaregler(values, regelProps).graderingSkalBesvares(),
        visibilityFilter: ({ values, regelProps }) =>
            (regelProps.erFarEllerMedmor && hasValue(values.aktivitetskravMor)) || !regelProps.erFarEllerMedmor,
    },
    [PeriodeUttakFormField.stillingsprosent]: {
        isAnswered: ({ values }) => hasValue(values.stillingsprosent),
        isIncluded: ({ values, regelProps }) => getUttakSkjemaregler(values, regelProps).graderingSkalBesvares(),
        visibilityFilter: ({ values }) => values.skalHaGradering === YesOrNo.YES,
    },
    [PeriodeUttakFormField.arbeidsformer]: {
        isAnswered: ({ values }) => values.arbeidsformer.length > 0,
        isIncluded: ({ values, regelProps }) => getUttakSkjemaregler(values, regelProps).graderingSkalBesvares(),
        visibilityFilter: ({ values }) => values.skalHaGradering === YesOrNo.YES,
    },
    [PeriodeUttakFormField.overføringsårsak]: {
        isAnswered: ({ values }) => hasValue(values.overføringsårsak),
        isIncluded: ({ values, regelProps }) => getUttakSkjemaregler(values, regelProps).overføringsårsakSkalBesvares(),
        visibilityFilter: ({ values }) => hasValue(values.konto),
    },
    [PeriodeUttakFormField.overføringsdokumentasjon]: {
        isAnswered: ({ values }) => values.overføringsdokumentasjon.length >= 0,
        isIncluded: ({ values, regelProps }) => getUttakSkjemaregler(values, regelProps).overføringsårsakSkalBesvares(),
        visibilityFilter: ({ values }) => hasValue(values.overføringsårsak),
    },
    [PeriodeUttakFormField.aktivitetskravMor]: {
        isAnswered: ({ values }) => hasValue(values.aktivitetskravMor),
        isIncluded: ({ values, regelProps }) =>
            getUttakSkjemaregler(values, regelProps).aktivitetskravMorSkalBesvares(),
        visibilityFilter: ({ values }) => values.samtidigUttak !== YesOrNo.UNANSWERED,
    },
    [PeriodeUttakFormField.aktivitetskravMorDokumentasjon]: {
        isAnswered: ({ values }) => values.aktivitetskravMorDokumentasjon.length >= 0,
        isIncluded: ({ values, regelProps }) =>
            getUttakSkjemaregler(values, regelProps).aktivitetskravMorSkalBesvares(),
        visibilityFilter: ({ values }) => values.samtidigUttak !== YesOrNo.UNANSWERED,
    },
};

export const periodeUttakFormQuestionsConfig = Questions<PeriodeUttakFormQuestionsPayload, PeriodeUttakFormField>(
    PeriodeUttakFormConfig
);
