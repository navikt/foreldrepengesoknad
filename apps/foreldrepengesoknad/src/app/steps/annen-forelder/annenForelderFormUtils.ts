import {
    AnnenForelder,
    AttachmentType,
    Barn,
    RegistrertAnnenForelder,
    Skjemanummer,
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
    hasValue,
    intlUtils,
    isAnnenForelderIkkeOppgitt,
    isAnnenForelderOppgitt,
    lagSendSenereDokumentNårIngenAndreFinnes,
} from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import SøkerData from 'app/context/types/SøkerData';
import { IntlShape } from 'react-intl';
import { AnnenForelderFormData, AnnenForelderFormField } from './annenforelderFormConfig';
import { YesOrNo, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';

export const initialAnnenForelderValues: AnnenForelderFormData = {
    [AnnenForelderFormField.kanIkkeOppgis]: false,
    [AnnenForelderFormField.harRettPåForeldrepengerINorge]: YesOrNo.UNANSWERED,
    [AnnenForelderFormField.harOppholdtSegIEØS]: YesOrNo.UNANSWERED,
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
    annenForelderFraRegistrertBarn: RegistrertAnnenForelder | undefined,
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
                  Skjemanummer.DOK_AV_ALENEOMSORG,
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
        harOppholdtSegIEØS: visibility.isVisible(AnnenForelderFormField.harOppholdtSegIEØS)
            ? values.harOppholdtSegIEØS
            : YesOrNo.UNANSWERED,
        harRettPåForeldrepengerIEØS: visibility.isVisible(AnnenForelderFormField.harRettPåForeldrepengerIEØS)
            ? values.harRettPåForeldrepengerIEØS
            : YesOrNo.UNANSWERED,
        kanIkkeOppgis: visibility.isVisible(AnnenForelderFormField.kanIkkeOppgis) ? values.kanIkkeOppgis : false,
        utenlandskFnr: visibility.isVisible(AnnenForelderFormField.utenlandskFnr) ? values.utenlandskFnr : false,
    };

    if (annenForelderFraRegistrertBarn !== undefined) {
        return {
            ...cleanedData,
            fornavn: annenForelderFraRegistrertBarn.fornavn,
            etternavn: annenForelderFraRegistrertBarn.etternavn,
            fnr: annenForelderFraRegistrertBarn.fnr,
        };
    }

    return cleanedData;
};

export const mapAnnenForelderFormToState = (values: Partial<AnnenForelderFormData>): AnnenForelder => {
    if (values.kanIkkeOppgis === false) {
        const harOppholdtSegIEØS = convertYesOrNoOrUndefinedToBoolean(values.harOppholdtSegIEØS);
        const harRettPåForeldrepengerIEØS = harOppholdtSegIEØS
            ? convertYesOrNoOrUndefinedToBoolean(values.harRettPåForeldrepengerIEØS)
            : false;
        return {
            etternavn: hasValue(values.etternavn) ? replaceInvisibleCharsWithSpace(values.etternavn!) : undefined,
            fornavn: hasValue(values.fornavn) ? replaceInvisibleCharsWithSpace(values.fornavn!) : undefined,
            fnr:
                hasValue(values.fnr) && values.fnr !== undefined
                    ? replaceInvisibleCharsWithSpace(values.fnr.trim())
                    : undefined,
            bostedsland: hasValue(values.bostedsland) ? values.bostedsland : undefined,
            utenlandskFnr: hasValue(values.utenlandskFnr) ? values.utenlandskFnr : undefined,
            erUfør: convertYesOrNoOrUndefinedToBoolean(values.erMorUfør),
            kanIkkeOppgis: values.kanIkkeOppgis,
            harRettPåForeldrepengerINorge: convertYesOrNoOrUndefinedToBoolean(values.harRettPåForeldrepengerINorge),
            harOppholdtSegIEØS,
            harRettPåForeldrepengerIEØS,
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
    annenForelderFraRegistrertBarn: RegistrertAnnenForelder | undefined,
    intl: IntlShape,
    søkerData?: SøkerData,
): AnnenForelderFormData => {
    if (isAnnenForelderOppgitt(annenForelder) && hasValue(annenForelder.fornavn)) {
        return {
            ...initialAnnenForelderValues,
            harRettPåForeldrepengerINorge: convertBooleanOrUndefinedToYesOrNo(
                annenForelder.harRettPåForeldrepengerINorge,
            ),
            harOppholdtSegIEØS: convertBooleanOrUndefinedToYesOrNo(annenForelder.harOppholdtSegIEØS),
            harRettPåForeldrepengerIEØS: convertBooleanOrUndefinedToYesOrNo(annenForelder.harRettPåForeldrepengerIEØS),
            bostedsland: annenForelder.bostedsland || '',
            erInformertOmSøknaden: convertBooleanOrUndefinedToYesOrNo(annenForelder.erInformertOmSøknaden),
            erMorUfør: convertBooleanOrUndefinedToYesOrNo(annenForelder.erUfør),
            dokumentasjonAvAleneomsorg: barn.dokumentasjonAvAleneomsorg || [],
            etternavn: annenForelder.etternavn,
            fornavn: annenForelder.fornavn === intlUtils(intl, 'annen.forelder') ? '' : annenForelder.fornavn,
            kanIkkeOppgis: annenForelder.kanIkkeOppgis,
            fnr: annenForelder.fnr,
            aleneOmOmsorg: convertBooleanOrUndefinedToYesOrNo(søkerData?.erAleneOmOmsorg),
            datoForAleneomsorg: dateToISOString(barn.datoForAleneomsorg) || '',
            utenlandskFnr: annenForelder.utenlandskFnr || false,
        };
    }

    if (annenForelderFraRegistrertBarn !== undefined) {
        return {
            ...initialAnnenForelderValues,
            fornavn: annenForelderFraRegistrertBarn.fornavn,
            etternavn: annenForelderFraRegistrertBarn.etternavn,
            fnr: annenForelderFraRegistrertBarn.fnr,
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
