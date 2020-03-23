import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';

export const enum AnnenForelderFieldNames {
    kanIkkeOppgis = 'kanIkkeOppgis',
    harRettPåForeldrepenger = 'harRettPåForeldrepenger',
    erInformertOmSøknaden = 'erInformertOmSøknaden',
    fornavn = 'fornavn',
    etternavn = 'etternavn',
    fnr = 'fnr',
    utenlandskFnr = 'utenlandskFnr',
    aleneOmOmsorg = 'aleneOmOmsorg'
}

export interface AnnenForelderFormValues {
    [AnnenForelderFieldNames.kanIkkeOppgis]: YesOrNo;
    [AnnenForelderFieldNames.harRettPåForeldrepenger]: YesOrNo;
    [AnnenForelderFieldNames.erInformertOmSøknaden]: YesOrNo;
    [AnnenForelderFieldNames.fornavn]: string;
    [AnnenForelderFieldNames.etternavn]: string;
    [AnnenForelderFieldNames.fnr]: string;
    [AnnenForelderFieldNames.utenlandskFnr]: boolean;
    [AnnenForelderFieldNames.aleneOmOmsorg]: boolean;
}

export const AnnenForelderFormComponents = getTypedFormComponents<AnnenForelderFieldNames, AnnenForelderFormValues>();
