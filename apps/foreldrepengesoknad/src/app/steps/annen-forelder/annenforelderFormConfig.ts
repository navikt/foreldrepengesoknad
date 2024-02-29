import { Attachment } from '@navikt/fp-types';
import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum AnnenForelderFormField {
    kanIkkeOppgis = 'kanIkkeOppgis',
    harRettPåForeldrepengerINorge = 'harRettPåForeldrepengerINorge',
    harOppholdtSegIEØS = 'harOppholdtSegIEØS',
    harRettPåForeldrepengerIEØS = 'harRettPåForeldrepengerIEØS',
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
    [AnnenForelderFormField.harRettPåForeldrepengerINorge]: YesOrNo;
    [AnnenForelderFormField.harOppholdtSegIEØS]: YesOrNo;
    [AnnenForelderFormField.harRettPåForeldrepengerIEØS]: YesOrNo;
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
