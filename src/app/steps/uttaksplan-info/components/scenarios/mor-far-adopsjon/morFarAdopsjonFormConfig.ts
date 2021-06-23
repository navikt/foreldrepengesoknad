import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';

export enum MorFarAdopsjonFormField {
    harAnnenForelderSøktFP = 'harAnnenForelderSøktFP',
    dekningsgrad = 'dekningsgrad',
}

export interface MorFarAdopsjonFormData {
    [MorFarAdopsjonFormField.harAnnenForelderSøktFP]: YesOrNo;
    [MorFarAdopsjonFormField.dekningsgrad]: string;
}

export const MorFarAdopsjonFormComponents = getTypedFormComponents<
    MorFarAdopsjonFormField,
    MorFarAdopsjonFormData,
    string
>();
