import { hasValue } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionConfig, Questions } from '@navikt/sif-common-question-config/lib';
import AnnenForelder from 'app/context/types/AnnenForelder';
import { isValidTidsperiode } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Situasjon } from 'app/types/Situasjon';
import { UttakRundtFødselÅrsak } from 'app/types/UttakRundtFødselÅrsak';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';
import { getSisteUttaksdag6UkerEtterFødsel } from 'app/utils/wlbUtils';
import dayjs from 'dayjs';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import hvemSkalTaUttakSkalBesvares from 'uttaksplan/utils/uttaksskjema/hvemSkalTaUttakSkalBesvares';
import getUttakSkjemaregler, {
    UttakSkjemaregler,
    UttakSkjemaReglerProps,
} from 'uttaksplan/utils/uttaksskjema/uttakSkjemaregler';
import { PeriodeUttakFormData, PeriodeUttakFormField } from './periodeUttakFormConfig';
import { harAnnenForelderRettIEØS } from 'app/utils/annenForelderUtils';
interface PeriodeUttakFormQuestionsPayload {
    values: PeriodeUttakFormData;
    regelProps: UttakSkjemaReglerProps;
}

export const erSamtidigUttakFarMedmorFørFødselWLB = (
    values: Partial<PeriodeUttakFormData>,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    erDeltUttak: boolean,
    situasjon: Situasjon
) => {
    return (
        andreAugust2022ReglerGjelder(familiehendelsesdato) &&
        erFarEllerMedmor &&
        erDeltUttak &&
        situasjon === 'fødsel' &&
        hasValue(values.fom) &&
        dayjs(values.fom).isBefore(familiehendelsesdato, 'day')
    );
};

export const erSamtidigUttakFarMedmorFørFørsteSeksUkerWLB = (
    values: Partial<PeriodeUttakFormData>,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    erDeltUttak: boolean,
    situasjon: Situasjon
) => {
    const sisteUttaksdag6UkerEtterFødsel = getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato);

    return (
        andreAugust2022ReglerGjelder(familiehendelsesdato) &&
        erFarEllerMedmor &&
        erDeltUttak &&
        situasjon === 'fødsel' &&
        hasValue(values.fom) &&
        dayjs(values.fom).isSameOrBefore(sisteUttaksdag6UkerEtterFødsel, 'day')
    );
};

export const skalViseWLBInfoOmSamtidigUttakRundtFødsel = (
    values: PeriodeUttakFormData,
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    erDeltUttak: boolean,
    situasjon: Situasjon
) => {
    return (
        values.uttakRundtFødselÅrsak === UttakRundtFødselÅrsak.samtidigUttak ||
        erSamtidigUttakFarMedmorFørFødselWLB(values, familiehendelsesdato, erFarEllerMedmor, erDeltUttak, situasjon)
    );
};

const skalViseGradering = (
    regler: UttakSkjemaregler,
    values: PeriodeUttakFormData,
    familiehendelsesdato: Date,
    erDeltUttakINorge: boolean,
    annenForelder: AnnenForelder
): boolean => {
    if (!isValidTidsperiode({ fom: values.fom, tom: values.tom })) {
        return false;
    }

    if (regler.overføringsårsakSkalBesvares() && !hasValue(values.overføringsårsak)) {
        return false;
    }

    if (
        regler.graderingSkalBesvaresPgaWLBUttakRundtFødsel() &&
        dayjs(values.fom).isSameOrAfter(familiehendelsesdato) &&
        (erDeltUttakINorge || harAnnenForelderRettIEØS(annenForelder)) &&
        !hasValue(values.uttakRundtFødselÅrsak)
    ) {
        return false;
    }

    if (
        values.konto === '' ||
        (regler.samtidigUttakSkalBesvares() && values.samtidigUttak === YesOrNo.UNANSWERED) ||
        (regler.ønskerFlerbarnsdagerSkalBesvares() && values.ønskerFlerbarnsdager === YesOrNo.UNANSWERED) ||
        (regler.aktivitetskravMorSkalBesvares() &&
            values.aktivitetskravMor === '' &&
            values.erMorForSyk !== YesOrNo.YES) ||
        (regler.erMorForSykSkalBesvares() && values.erMorForSyk !== YesOrNo.YES)
    ) {
        return false;
    }
    return true;
};

const skalViseAktivitetskrav = (regler: UttakSkjemaregler, values: PeriodeUttakFormData): boolean => {
    if (!isValidTidsperiode({ fom: values.fom, tom: values.tom })) {
        return false;
    }

    if (regler.erMorForSykSkalBesvares() && values.erMorForSyk !== YesOrNo.NO) {
        return false;
    }

    if (regler.ønskerFlerbarnsdagerSkalBesvares() && values.ønskerFlerbarnsdager === YesOrNo.UNANSWERED) {
        return false;
    }

    return regler.samtidigUttakSkalBesvares()
        ? values.samtidigUttak !== YesOrNo.UNANSWERED
        : values.konto !== undefined;
};

const skalViseSamtidigUttak = (regler: UttakSkjemaregler, values: PeriodeUttakFormData): boolean => {
    if (!isValidTidsperiode({ fom: values.fom, tom: values.tom })) {
        return false;
    }

    if (values.konto === StønadskontoType.Foreldrepenger) {
        return false;
    }

    if (values.konto === '') {
        return false;
    }

    if (regler.ønskerFlerbarnsdagerSkalBesvares() && values.ønskerFlerbarnsdager === YesOrNo.UNANSWERED) {
        return false;
    }

    if (regler.erMorForSykSkalBesvares() && values.erMorForSyk === YesOrNo.NO) {
        return false;
    }

    return true;
};

const skalViseFlerbarnsdager = (values: PeriodeUttakFormData): boolean => {
    if (!isValidTidsperiode({ fom: values.fom, tom: values.tom })) {
        return false;
    }

    return (
        values.konto === StønadskontoType.Fellesperiode ||
        values.konto === StønadskontoType.Fedrekvote ||
        values.konto === StønadskontoType.Foreldrepenger
    );
};

const skalViseKonto = (
    values: PeriodeUttakFormData,
    familiehendelsesdato: Date,
    erDeltUttakINorge: boolean,
    erFarEllerMedmor: boolean,
    situasjon: Situasjon
): boolean => {
    const tidsperiode = { fom: values.fom, tom: values.tom };
    if (!isValidTidsperiode(tidsperiode)) {
        return false;
    }
    if (
        hvemSkalTaUttakSkalBesvares(
            tidsperiode,
            erDeltUttakINorge,
            familiehendelsesdato,
            erFarEllerMedmor,
            situasjon
        ) &&
        !hasValue(values.hvemSkalTaUttak)
    ) {
        return false;
    }
    return true;
};

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
        isIncluded: ({ regelProps, values }) => getUttakSkjemaregler(values, regelProps).hvemSkalTaUttakSkalBesvares(),
        visibilityFilter: ({ values }) => isValidTidsperiode({ fom: values.fom, tom: values.tom }),
    },
    [PeriodeUttakFormField.konto]: {
        isAnswered: ({ values }) => hasValue(values.konto),
        isIncluded: ({ regelProps, values }) => getUttakSkjemaregler(values, regelProps).kontoSkalBesvares(),
        visibilityFilter: ({ regelProps, values }) =>
            skalViseKonto(
                values,
                regelProps.familiehendelsesdato,
                regelProps.erDeltUttakINorge,
                regelProps.erFarEllerMedmor,
                regelProps.situasjon
            ),
    },
    [PeriodeUttakFormField.ønskerFlerbarnsdager]: {
        isAnswered: ({ values }) => values.ønskerFlerbarnsdager !== YesOrNo.UNANSWERED,
        isIncluded: ({ values, regelProps }) =>
            getUttakSkjemaregler(values, regelProps).ønskerFlerbarnsdagerSkalBesvares(),
        visibilityFilter: ({ values }) => skalViseFlerbarnsdager(values),
    },
    [PeriodeUttakFormField.erMorForSyk]: {
        isAnswered: ({ values }) => values.erMorForSyk !== YesOrNo.UNANSWERED,
        isIncluded: ({ values, regelProps }) => getUttakSkjemaregler(values, regelProps).erMorForSykSkalBesvares(),
        visibilityFilter: ({ values }) => values.ønskerFlerbarnsdager !== YesOrNo.UNANSWERED || hasValue(values.konto),
    },
    [PeriodeUttakFormField.uttakRundtFødselÅrsak]: {
        isAnswered: ({ values }) => hasValue(values.uttakRundtFødselÅrsak),
        isIncluded: ({ values, regelProps }) =>
            getUttakSkjemaregler(values, regelProps).uttakRundtFødselÅrsakSpørsmålSkalBesvares(),
        visibilityFilter: ({ values }) => values.ønskerFlerbarnsdager !== YesOrNo.UNANSWERED || hasValue(values.konto),
    },
    [PeriodeUttakFormField.samtidigUttak]: {
        isAnswered: ({ values }) => values.samtidigUttak !== YesOrNo.UNANSWERED,
        isIncluded: ({ values, regelProps }) => getUttakSkjemaregler(values, regelProps).samtidigUttakSkalBesvares(),
        visibilityFilter: ({ values, regelProps }) =>
            skalViseSamtidigUttak(getUttakSkjemaregler(values, regelProps), values),
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
            skalViseGradering(
                getUttakSkjemaregler(values, regelProps),
                values,
                regelProps.familiehendelsesdato,
                regelProps.erDeltUttakINorge,
                regelProps.annenForelder
            ),
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
        visibilityFilter: ({ values, regelProps }) =>
            skalViseAktivitetskrav(getUttakSkjemaregler(values, regelProps), values),
    },
    [PeriodeUttakFormField.aktivitetskravMorDokumentasjon]: {
        isAnswered: ({ values }) => values.aktivitetskravMorDokumentasjon.length >= 0,
        isIncluded: ({ values, regelProps }) =>
            getUttakSkjemaregler(values, regelProps).aktivitetskravMorSkalBesvares(),
        visibilityFilter: ({ values, regelProps }) =>
            skalViseAktivitetskrav(getUttakSkjemaregler(values, regelProps), values),
    },
};

export const periodeUttakFormQuestionsConfig = Questions<PeriodeUttakFormQuestionsPayload, PeriodeUttakFormField>(
    PeriodeUttakFormConfig
);
