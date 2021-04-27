import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';

export enum VelkommenFormField {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
}

export interface VelkommenFormData {
    [VelkommenFormField.harForståttRettigheterOgPlikter]: boolean;
}

export const getInitialVelkommenValues = (harForståttRettigheterOgPlikter: boolean): VelkommenFormData => {
    return {
        harForståttRettigheterOgPlikter,
    };
};

export const VelkommenFormComponents = getTypedFormComponents<VelkommenFormField, VelkommenFormData, string>();
