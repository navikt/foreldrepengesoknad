import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';

export enum MorFarAdopsjonFormField {
    harAnnenForelderSøktFP = 'harAnnenForelderSøktFP',
}

export interface MorFarAdopsjonFormData {
    [MorFarAdopsjonFormField.harAnnenForelderSøktFP]: YesOrNo;
}

export const MorFarAdopsjonFormComponents = getTypedFormComponents<
    MorFarAdopsjonFormField,
    MorFarAdopsjonFormData,
    string
>();
