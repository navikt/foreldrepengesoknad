import { hasValue } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import AnnenForelder, { isAnnenForelderIkkeOppgitt, isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import Barn from 'app/context/types/Barn';
import Søker from 'app/context/types/Søker';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { AnnenForelderFormData, AnnenForelderFormField } from './annenforelderFormConfig';

export const initialAnnenForelderValues: AnnenForelderFormData = {
    [AnnenForelderFormField.kanIkkeOppgis]: false,
    [AnnenForelderFormField.harRettPåForeldrepenger]: YesOrNo.UNANSWERED,
    [AnnenForelderFormField.erInformertOmSøknaden]: YesOrNo.UNANSWERED,
    [AnnenForelderFormField.fornavn]: '',
    [AnnenForelderFormField.etternavn]: '',
    [AnnenForelderFormField.fnr]: '',
    [AnnenForelderFormField.utenlandskFnr]: false,
    [AnnenForelderFormField.aleneOmOmsorg]: YesOrNo.UNANSWERED,
    [AnnenForelderFormField.erMorUfør]: YesOrNo.UNANSWERED,
    [AnnenForelderFormField.datoForAleneomsorg]: '',
    [AnnenForelderFormField.bostedsland]: '',
    [AnnenForelderFormField.dokumentasjonAvAleneomsorg]: [],
};

export const cleanAnnenForelderFormData = (
    values: AnnenForelderFormData,
    visibility: QuestionVisibility<AnnenForelderFormField, undefined>
): AnnenForelderFormData => {
    return {
        aleneOmOmsorg: visibility.isVisible(AnnenForelderFormField.aleneOmOmsorg)
            ? values.aleneOmOmsorg
            : YesOrNo.UNANSWERED,
        bostedsland: visibility.isVisible(AnnenForelderFormField.bostedsland) ? values.bostedsland : '',
        datoForAleneomsorg: visibility.isVisible(AnnenForelderFormField.datoForAleneomsorg)
            ? values.datoForAleneomsorg
            : '',
        dokumentasjonAvAleneomsorg: visibility.isVisible(AnnenForelderFormField.dokumentasjonAvAleneomsorg)
            ? values.dokumentasjonAvAleneomsorg
            : [],
        erInformertOmSøknaden: visibility.isVisible(AnnenForelderFormField.erInformertOmSøknaden)
            ? values.erInformertOmSøknaden
            : YesOrNo.UNANSWERED,
        erMorUfør: visibility.isVisible(AnnenForelderFormField.erMorUfør) ? values.erMorUfør : YesOrNo.UNANSWERED,
        etternavn: visibility.isVisible(AnnenForelderFormField.etternavn) ? values.etternavn : '',
        fnr: visibility.isVisible(AnnenForelderFormField.fnr) ? values.fnr : '',
        fornavn: visibility.isVisible(AnnenForelderFormField.fornavn) ? values.fornavn : '',
        harRettPåForeldrepenger: visibility.isVisible(AnnenForelderFormField.harRettPåForeldrepenger)
            ? values.harRettPåForeldrepenger
            : YesOrNo.UNANSWERED,
        kanIkkeOppgis: visibility.isVisible(AnnenForelderFormField.kanIkkeOppgis) ? values.kanIkkeOppgis : false,
        utenlandskFnr: visibility.isVisible(AnnenForelderFormField.utenlandskFnr) ? values.utenlandskFnr : false,
    };
};

export const mapAnnenForelderFormToState = (values: Partial<AnnenForelderFormData>): AnnenForelder => {
    if (values.kanIkkeOppgis === false) {
        return {
            etternavn: hasValue(values.etternavn) ? values.etternavn : undefined,
            fornavn: hasValue(values.fornavn) ? values.fornavn : undefined,
            fnr: hasValue(values.fnr) ? values.fnr : undefined,
            bostedsland: hasValue(values.bostedsland) ? values.bostedsland : undefined,
            utenlandskFnr: hasValue(values.utenlandskFnr) ? values.utenlandskFnr : undefined,
            erUfør: convertYesOrNoOrUndefinedToBoolean(values.erMorUfør),
            kanIkkeOppgis: values.kanIkkeOppgis,
            harRettPåForeldrepenger: convertYesOrNoOrUndefinedToBoolean(values.harRettPåForeldrepenger),
            erInformertOmSøknaden: convertYesOrNoOrUndefinedToBoolean(values.erInformertOmSøknaden),
        };
    }

    return {
        kanIkkeOppgis: true,
    };
};

export const getAnnenForelderFormInitialValues = (
    annenForelder: AnnenForelder,
    barn: Barn,
    søker: Søker
): AnnenForelderFormData => {
    if (isAnnenForelderOppgitt(annenForelder)) {
        return {
            ...initialAnnenForelderValues,
            harRettPåForeldrepenger: convertBooleanOrUndefinedToYesOrNo(annenForelder.harRettPåForeldrepenger),
            bostedsland: annenForelder.bostedsland || '',
            erInformertOmSøknaden: convertBooleanOrUndefinedToYesOrNo(annenForelder.erInformertOmSøknaden),
            erMorUfør: convertBooleanOrUndefinedToYesOrNo(annenForelder.erUfør),
            dokumentasjonAvAleneomsorg: barn.dokumentasjonAvAleneomsorg || [],
            etternavn: annenForelder.etternavn,
            fornavn: annenForelder.fornavn,
            kanIkkeOppgis: annenForelder.kanIkkeOppgis,
            fnr: annenForelder.fnr,
            aleneOmOmsorg: convertBooleanOrUndefinedToYesOrNo(søker.erAleneOmOmsorg),
            utenlandskFnr: annenForelder.utenlandskFnr || false,
        };
    }

    if (isAnnenForelderIkkeOppgitt(annenForelder)) {
        return {
            ...initialAnnenForelderValues,
            kanIkkeOppgis: annenForelder.kanIkkeOppgis,
        };
    }

    return {
        ...initialAnnenForelderValues,
    };
};
