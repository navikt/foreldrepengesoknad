import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { AnnenForelderFormData, AnnenForelderFormField } from './annenforelderFormConfig';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { Søkerrolle } from 'app/types/Søkerrolle';
import { hasValue } from '@navikt/fp-common';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';

interface AnnenForelderQuestionsPayload extends AnnenForelderFormData {
    skalOppgiPersonalia: boolean;
    søkerRolle: Søkerrolle;
    gjelderStebarnsadopsjon: boolean;
}

const isAnnenForelderKanIkkeOppgisIncluded = (søkerRolle: Søkerrolle, gjelderStebarnsadopsjon: boolean): boolean => {
    if (gjelderStebarnsadopsjon) {
        return false;
    }

    if (søkerRolle === 'medmor') {
        return false;
    }

    return true;
};

const AnnenForelderFormConfig: QuestionConfig<AnnenForelderQuestionsPayload, AnnenForelderFormField> = {
    [AnnenForelderFormField.fornavn]: {
        isAnswered: ({ fornavn }) => hasValue(fornavn),
        isIncluded: ({ skalOppgiPersonalia }) => skalOppgiPersonalia,
        isOptional: ({ kanIkkeOppgis }) => kanIkkeOppgis === true,
    },
    [AnnenForelderFormField.etternavn]: {
        isAnswered: ({ etternavn }) => hasValue(etternavn),
        isIncluded: ({ skalOppgiPersonalia }) => skalOppgiPersonalia,
        isOptional: ({ kanIkkeOppgis }) => kanIkkeOppgis === true,
    },
    [AnnenForelderFormField.kanIkkeOppgis]: {
        isAnswered: ({ kanIkkeOppgis }) => hasValue(kanIkkeOppgis),
        isOptional: () => true,
        isIncluded: ({ skalOppgiPersonalia, søkerRolle, gjelderStebarnsadopsjon }) =>
            skalOppgiPersonalia && isAnnenForelderKanIkkeOppgisIncluded(søkerRolle, gjelderStebarnsadopsjon),
    },
    [AnnenForelderFormField.fnr]: {
        isAnswered: ({ fnr, utenlandskFnr }) => hasValue(fnr) || (utenlandskFnr === true && hasValue(fnr)),
        isIncluded: ({ skalOppgiPersonalia, kanIkkeOppgis }) => skalOppgiPersonalia && kanIkkeOppgis !== true,
        visibilityFilter: ({ fornavn, etternavn }) => hasValue(fornavn) && hasValue(etternavn),
    },
    [AnnenForelderFormField.utenlandskFnr]: {
        isAnswered: ({ utenlandskFnr }) => hasValue(utenlandskFnr),
        visibilityFilter: ({ kanIkkeOppgis, fornavn, etternavn }) =>
            kanIkkeOppgis !== true && hasValue(fornavn) && hasValue(etternavn),
        isIncluded: ({ skalOppgiPersonalia }) => skalOppgiPersonalia,
        isOptional: () => true,
    },
    [AnnenForelderFormField.aleneOmOmsorg]: {
        isAnswered: ({ aleneOmOmsorg }) => aleneOmOmsorg !== YesOrNo.UNANSWERED,
        isIncluded: ({ kanIkkeOppgis }) => kanIkkeOppgis === false,
        visibilityFilter: ({ skalOppgiPersonalia, fnr, utenlandskFnr, bostedsland }) =>
            !skalOppgiPersonalia ||
            (skalOppgiPersonalia && hasValue(fnr) && utenlandskFnr === false) ||
            (skalOppgiPersonalia && hasValue(bostedsland) && utenlandskFnr === true),
    },
    [AnnenForelderFormField.dokumentasjonAvAleneomsorg]: {
        isAnswered: () => true,
        isIncluded: ({ aleneOmOmsorg, søkerRolle }) => aleneOmOmsorg === YesOrNo.YES && søkerRolle !== 'mor',
        visibilityFilter: ({ aleneOmOmsorg, datoForAleneomsorg }) =>
            aleneOmOmsorg === YesOrNo.YES || hasValue(datoForAleneomsorg),
    },
    [AnnenForelderFormField.harRettPåForeldrepengerINorge]: {
        parentQuestion: AnnenForelderFormField.aleneOmOmsorg,
        isAnswered: ({ harRettPåForeldrepengerINorge }) => harRettPåForeldrepengerINorge !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ aleneOmOmsorg }) => aleneOmOmsorg === YesOrNo.NO,
    },
    [AnnenForelderFormField.harRettPåForeldrepengerIEØS]: {
        parentQuestion: AnnenForelderFormField.harRettPåForeldrepengerINorge,
        isAnswered: ({ harRettPåForeldrepengerIEØS }) => harRettPåForeldrepengerIEØS !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ aleneOmOmsorg }) => aleneOmOmsorg === YesOrNo.NO,
        isIncluded: ({ harRettPåForeldrepengerINorge }) => harRettPåForeldrepengerINorge === YesOrNo.NO,
    },
    [AnnenForelderFormField.erInformertOmSøknaden]: {
        parentQuestion: AnnenForelderFormField.harRettPåForeldrepengerINorge,
        isAnswered: ({ erInformertOmSøknaden }) => erInformertOmSøknaden !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ aleneOmOmsorg, harRettPåForeldrepengerINorge }) =>
            aleneOmOmsorg === YesOrNo.NO && harRettPåForeldrepengerINorge === YesOrNo.YES,
    },
    [AnnenForelderFormField.erMorUfør]: {
        parentQuestion: AnnenForelderFormField.harRettPåForeldrepengerINorge,
        isAnswered: ({ erMorUfør }) => erMorUfør !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ aleneOmOmsorg, harRettPåForeldrepengerINorge, harRettPåForeldrepengerIEØS, søkerRolle }) =>
            aleneOmOmsorg === YesOrNo.NO &&
            harRettPåForeldrepengerINorge === YesOrNo.NO &&
            harRettPåForeldrepengerIEØS === YesOrNo.NO &&
            isFarEllerMedmor(søkerRolle),
    },
    [AnnenForelderFormField.datoForAleneomsorg]: {
        isAnswered: ({ datoForAleneomsorg }) => hasValue(datoForAleneomsorg),
        isIncluded: ({ aleneOmOmsorg, søkerRolle }) => aleneOmOmsorg === YesOrNo.YES && isFarEllerMedmor(søkerRolle),
    },
    [AnnenForelderFormField.bostedsland]: {
        isAnswered: ({ bostedsland }) => hasValue(bostedsland),
        isIncluded: ({ utenlandskFnr }) => utenlandskFnr === true,
        visibilityFilter: ({ fnr }) => hasValue(fnr),
    },
};

export const annenForelderQuestionsConfig = Questions<AnnenForelderQuestionsPayload, AnnenForelderFormField>(
    AnnenForelderFormConfig
);
