import { hasValue } from '@navikt/fp-common';
import { dateToISOString, YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import AnnenForelder, { isAnnenForelderIkkeOppgitt, isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import Barn from 'app/context/types/Barn';
import Søker from 'app/context/types/Søker';
import { AttachmentType } from 'app/types/AttachmentType';
import { RegistrertBarn } from 'app/types/Person';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { convertBooleanOrUndefinedToYesOrNo, convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { replaceInvisibleCharsWithSpace } from 'app/utils/stringUtils';
import { lagSendSenereDokumentNårIngenAndreFinnes } from 'app/utils/vedleggUtils';
import { AnnenForelderFormData, AnnenForelderFormField } from './annenforelderFormConfig';

export const initialAnnenForelderValues: AnnenForelderFormData = {
    [AnnenForelderFormField.kanIkkeOppgis]: false,
    [AnnenForelderFormField.harRettPåForeldrepengerINorge]: YesOrNo.UNANSWERED,
    [AnnenForelderFormField.harRettPåForeldrepengerIEØS]: YesOrNo.UNANSWERED,
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
    visibility: QuestionVisibility<AnnenForelderFormField, undefined>,
    registrertBarn: RegistrertBarn | undefined
): AnnenForelderFormData => {
    const cleanedData: AnnenForelderFormData = {
        aleneOmOmsorg: visibility.isVisible(AnnenForelderFormField.aleneOmOmsorg)
            ? values.aleneOmOmsorg
            : YesOrNo.UNANSWERED,
        bostedsland: visibility.isVisible(AnnenForelderFormField.bostedsland) ? values.bostedsland : '',
        datoForAleneomsorg: visibility.isVisible(AnnenForelderFormField.datoForAleneomsorg)
            ? values.datoForAleneomsorg
            : '',
        dokumentasjonAvAleneomsorg: visibility.isVisible(AnnenForelderFormField.dokumentasjonAvAleneomsorg)
            ? lagSendSenereDokumentNårIngenAndreFinnes(
                  values.dokumentasjonAvAleneomsorg,
                  AttachmentType.ALENEOMSORG,
                  Skjemanummer.DOK_AV_ALENEOMSORG
              )
            : [],
        erInformertOmSøknaden: visibility.isVisible(AnnenForelderFormField.erInformertOmSøknaden)
            ? values.erInformertOmSøknaden
            : YesOrNo.UNANSWERED,
        erMorUfør: visibility.isVisible(AnnenForelderFormField.erMorUfør) ? values.erMorUfør : YesOrNo.UNANSWERED,
        etternavn: visibility.isVisible(AnnenForelderFormField.etternavn) ? values.etternavn : '',
        fnr: visibility.isVisible(AnnenForelderFormField.fnr) ? values.fnr : '',
        fornavn: visibility.isVisible(AnnenForelderFormField.fornavn) ? values.fornavn : '',
        harRettPåForeldrepengerINorge: visibility.isVisible(AnnenForelderFormField.harRettPåForeldrepengerINorge)
            ? values.harRettPåForeldrepengerINorge
            : YesOrNo.UNANSWERED,
        harRettPåForeldrepengerIEØS: visibility.isVisible(AnnenForelderFormField.harRettPåForeldrepengerIEØS)
            ? values.harRettPåForeldrepengerIEØS
            : YesOrNo.UNANSWERED,
        kanIkkeOppgis: visibility.isVisible(AnnenForelderFormField.kanIkkeOppgis) ? values.kanIkkeOppgis : false,
        utenlandskFnr: visibility.isVisible(AnnenForelderFormField.utenlandskFnr) ? values.utenlandskFnr : false,
    };

    if (!!registrertBarn && !!registrertBarn.annenForelder) {
        return {
            ...cleanedData,
            fornavn: registrertBarn.annenForelder.fornavn,
            etternavn: registrertBarn.annenForelder.etternavn,
            fnr: registrertBarn.annenForelder.fnr,
        };
    }

    return cleanedData;
};

export const mapAnnenForelderFormToState = (values: Partial<AnnenForelderFormData>): AnnenForelder => {
    if (values.kanIkkeOppgis === false) {
        return {
            etternavn: hasValue(values.etternavn) ? replaceInvisibleCharsWithSpace(values.etternavn!) : undefined,
            fornavn: hasValue(values.fornavn) ? replaceInvisibleCharsWithSpace(values.fornavn!) : undefined,
            fnr: hasValue(values.fnr) ? values.fnr : undefined,
            bostedsland: hasValue(values.bostedsland) ? values.bostedsland : undefined,
            utenlandskFnr: hasValue(values.utenlandskFnr) ? values.utenlandskFnr : undefined,
            erUfør: convertYesOrNoOrUndefinedToBoolean(values.erMorUfør),
            kanIkkeOppgis: values.kanIkkeOppgis,
            harRettPåForeldrepengerINorge: convertYesOrNoOrUndefinedToBoolean(values.harRettPåForeldrepengerINorge),
            harRettPåForeldrepengerIEØS: convertYesOrNoOrUndefinedToBoolean(values.harRettPåForeldrepengerIEØS),
            erInformertOmSøknaden: convertYesOrNoOrUndefinedToBoolean(values.erInformertOmSøknaden),
        };
    }

    return {
        kanIkkeOppgis: true,
    };
};

export const getAnnenForelderFormInitialValues = (
    annenForelder: AnnenForelder | undefined,
    barn: Barn,
    søker: Søker,
    registrertBarn: RegistrertBarn | undefined
): AnnenForelderFormData => {
    if (annenForelder !== undefined && isAnnenForelderOppgitt(annenForelder) && hasValue(annenForelder.fornavn)) {
        return {
            ...initialAnnenForelderValues,
            harRettPåForeldrepengerINorge: convertBooleanOrUndefinedToYesOrNo(
                annenForelder.harRettPåForeldrepengerINorge
            ),
            harRettPåForeldrepengerIEØS: convertBooleanOrUndefinedToYesOrNo(annenForelder.harRettPåForeldrepengerIEØS),
            bostedsland: annenForelder.bostedsland || '',
            erInformertOmSøknaden: convertBooleanOrUndefinedToYesOrNo(annenForelder.erInformertOmSøknaden),
            erMorUfør: convertBooleanOrUndefinedToYesOrNo(annenForelder.erUfør),
            dokumentasjonAvAleneomsorg: barn.dokumentasjonAvAleneomsorg || [],
            etternavn: annenForelder.etternavn,
            fornavn: annenForelder.fornavn,
            kanIkkeOppgis: annenForelder.kanIkkeOppgis,
            fnr: annenForelder.fnr,
            aleneOmOmsorg: convertBooleanOrUndefinedToYesOrNo(søker.erAleneOmOmsorg),
            datoForAleneomsorg: dateToISOString(barn.datoForAleneomsorg) || '',
            utenlandskFnr: annenForelder.utenlandskFnr || false,
        };
    }

    if (!!registrertBarn && !!registrertBarn.annenForelder) {
        return {
            ...initialAnnenForelderValues,
            fornavn: registrertBarn.annenForelder.fornavn,
            etternavn: registrertBarn.annenForelder.etternavn,
            fnr: registrertBarn.annenForelder.fnr,
        };
    }

    if (annenForelder !== undefined && isAnnenForelderIkkeOppgitt(annenForelder)) {
        return {
            ...initialAnnenForelderValues,
            kanIkkeOppgis: annenForelder.kanIkkeOppgis,
        };
    }

    return {
        ...initialAnnenForelderValues,
    };
};
