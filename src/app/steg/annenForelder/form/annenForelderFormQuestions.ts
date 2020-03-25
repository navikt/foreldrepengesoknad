import { QuestionConfig, Questions } from '@navikt/sif-common-question-config';
import { AnnenForelderFormValues, AnnenForelderFieldNames } from './annenforelderFormTypes';
import { hasValue } from 'app/validation/fieldValidations';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { SøkerRolle } from 'app/types/søknad/Søknad';
import { getErSøkerFarEllerMedmor } from 'app/util/domain/personUtil';

interface AnnenForelderQuestionsPayload extends AnnenForelderFormValues {
    skalOppgiPersonalia: boolean;
    søkerRolle: SøkerRolle;
    gjelderStebarnsadopsjon: boolean;
}

const isAnnenForelderKanIkkeOppgisIncluded = (payload: AnnenForelderQuestionsPayload): boolean => {
    const { søkerRolle, gjelderStebarnsadopsjon } = payload;
    if (gjelderStebarnsadopsjon) {
        return false;
    }
    if (søkerRolle === SøkerRolle.MEDMOR) {
        return false;
    }
    return true;
};

const AnnenForelderFormConfig: QuestionConfig<AnnenForelderQuestionsPayload, AnnenForelderFieldNames> = {
    [AnnenForelderFieldNames.fornavn]: {
        isAnswered: ({ fornavn }) => hasValue(fornavn),
        isIncluded: ({ skalOppgiPersonalia }) => skalOppgiPersonalia
    },
    [AnnenForelderFieldNames.kanIkkeOppgis]: {
        isAnswered: ({ kanIkkeOppgis }) => hasValue(kanIkkeOppgis),
        isOptional: () => true,
        isIncluded: (payload) => payload.skalOppgiPersonalia && isAnnenForelderKanIkkeOppgisIncluded(payload)
    },
    [AnnenForelderFieldNames.fnr]: {
        isAnswered: ({ fnr }) => hasValue(fnr),
        isIncluded: ({ skalOppgiPersonalia, kanIkkeOppgis }) => skalOppgiPersonalia && kanIkkeOppgis !== true,
        visibilityFilter: ({ fornavn, etternavn }) => hasValue(fornavn) && hasValue(etternavn)
    },
    [AnnenForelderFieldNames.utenlandskFnr]: {
        isAnswered: ({ utenlandskFnr }) => hasValue(utenlandskFnr),
        visibilityFilter: ({ kanIkkeOppgis, fornavn, etternavn }) =>
            kanIkkeOppgis !== true && hasValue(fornavn) && hasValue(etternavn),
        isIncluded: ({ skalOppgiPersonalia }) => skalOppgiPersonalia
    },
    [AnnenForelderFieldNames.aleneOmOmsorg]: {
        parentQuestion: AnnenForelderFieldNames.fnr,
        isAnswered: ({ aleneOmOmsorg }) => aleneOmOmsorg !== YesOrNo.UNANSWERED,
        isIncluded: ({ kanIkkeOppgis }) => !kanIkkeOppgis,
        visibilityFilter: ({ skalOppgiPersonalia, fnr, utenlandskFnr, bostedsland }) =>
            !skalOppgiPersonalia ||
            (skalOppgiPersonalia && hasValue(fnr) && !utenlandskFnr) ||
            (skalOppgiPersonalia && hasValue(bostedsland) && utenlandskFnr)
    },
    [AnnenForelderFieldNames.harRettPåForeldrepenger]: {
        parentQuestion: AnnenForelderFieldNames.aleneOmOmsorg,
        isAnswered: ({ harRettPåForeldrepenger }) => harRettPåForeldrepenger !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ aleneOmOmsorg }) => aleneOmOmsorg === YesOrNo.NO
    },
    [AnnenForelderFieldNames.erInformertOmSøknaden]: {
        parentQuestion: AnnenForelderFieldNames.harRettPåForeldrepenger,
        isAnswered: ({ erInformertOmSøknaden }) => erInformertOmSøknaden !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ aleneOmOmsorg, harRettPåForeldrepenger }) =>
            aleneOmOmsorg === YesOrNo.NO && harRettPåForeldrepenger !== YesOrNo.UNANSWERED
    },
    [AnnenForelderFieldNames.erMorUfør]: {
        parentQuestion: AnnenForelderFieldNames.harRettPåForeldrepenger,
        isAnswered: ({ erInformertOmSøknaden }) => erInformertOmSøknaden !== YesOrNo.UNANSWERED,
        visibilityFilter: ({ aleneOmOmsorg, harRettPåForeldrepenger, søkerRolle }) =>
            aleneOmOmsorg === YesOrNo.NO &&
            harRettPåForeldrepenger === YesOrNo.NO &&
            getErSøkerFarEllerMedmor(søkerRolle)
    },
    [AnnenForelderFieldNames.datoForAleneomsorg]: {
        isAnswered: ({ datoForAleneomsorg }) => hasValue(datoForAleneomsorg),
        isIncluded: ({ aleneOmOmsorg, søkerRolle }) =>
            aleneOmOmsorg === YesOrNo.YES && getErSøkerFarEllerMedmor(søkerRolle)
    },
    [AnnenForelderFieldNames.bostedsland]: {
        isAnswered: ({ bostedsland }) => hasValue(bostedsland),
        isIncluded: ({ utenlandskFnr }) => utenlandskFnr === true
    }
};

export const annenForelderFormQuestions = Questions<AnnenForelderQuestionsPayload, AnnenForelderFieldNames>(
    AnnenForelderFormConfig
);
