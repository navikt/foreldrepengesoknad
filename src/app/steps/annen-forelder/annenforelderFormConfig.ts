import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import { Attachment } from 'app/types/Attachment';

export const enum AnnenForelderFormField {
    kanIkkeOppgis = 'kanIkkeOppgis',
    harRettPåForeldrepenger = 'harRettPåForeldrepenger',
    erInformertOmSøknaden = 'erInformertOmSøknaden',
    fornavn = 'fornavn',
    etternavn = 'etternavn',
    fnr = 'fnr',
    utenlandskFnr = 'utenlandskFnr',
    aleneOmOmsorg = 'aleneOmOmsorg',
    erMorUfør = 'erMorUfør',
    datoForAleneomsorg = 'datoForAleneomsorg',
    bostedsland = 'bostedsland',
    dokumentasjonAvAleneomsorg = 'dokumentasjonAvAleneomsorg',
}

export interface AnnenForelderFormData {
    [AnnenForelderFormField.kanIkkeOppgis]: boolean;
    [AnnenForelderFormField.harRettPåForeldrepenger]: YesOrNo;
    [AnnenForelderFormField.erInformertOmSøknaden]: YesOrNo;
    [AnnenForelderFormField.fornavn]: string;
    [AnnenForelderFormField.etternavn]: string;
    [AnnenForelderFormField.fnr]: string;
    [AnnenForelderFormField.utenlandskFnr]: boolean;
    [AnnenForelderFormField.aleneOmOmsorg]: YesOrNo;
    [AnnenForelderFormField.erMorUfør]: YesOrNo;
    [AnnenForelderFormField.datoForAleneomsorg]: string;
    [AnnenForelderFormField.bostedsland]: string;
    [AnnenForelderFormField.dokumentasjonAvAleneomsorg]: Attachment[];
}

export const AnnenForelderFormComponents = getTypedFormComponents<
    AnnenForelderFormField,
    AnnenForelderFormData,
    string
>();

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
