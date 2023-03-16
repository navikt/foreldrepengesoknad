import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';

export enum VelkommenFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
}

export interface VelkommenFormData {
    [VelkommenFormField.harForståttRettigheterOgPlikter]: boolean;
}

export const initialVelkommenValues: VelkommenFormData = {
    [VelkommenFormField.harForståttRettigheterOgPlikter]: false,
};

export const VelkommenFormComponents = getTypedFormComponents<VelkommenFormField, VelkommenFormData>();
