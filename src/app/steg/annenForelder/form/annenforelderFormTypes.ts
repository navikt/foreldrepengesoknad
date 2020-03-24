import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';

export const enum AnnenForelderFieldNames {
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
    bostedsland = 'bostedsland'
}

export interface AnnenForelderFormValues {
    [AnnenForelderFieldNames.kanIkkeOppgis]: boolean;
    [AnnenForelderFieldNames.harRettPåForeldrepenger]: YesOrNo;
    [AnnenForelderFieldNames.erInformertOmSøknaden]: YesOrNo;
    [AnnenForelderFieldNames.fornavn]: string;
    [AnnenForelderFieldNames.etternavn]: string;
    [AnnenForelderFieldNames.fnr]: string;
    [AnnenForelderFieldNames.utenlandskFnr]: boolean;
    [AnnenForelderFieldNames.aleneOmOmsorg]: YesOrNo;
    [AnnenForelderFieldNames.erMorUfør]: YesOrNo;
    [AnnenForelderFieldNames.datoForAleneomsorg]: Date;
    [AnnenForelderFieldNames.bostedsland]: string;
}

export const AnnenForelderFormComponents = getTypedFormComponents<AnnenForelderFieldNames, AnnenForelderFormValues>();
