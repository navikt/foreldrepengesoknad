import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum VelgArbeidFormField {
    arbeidMedTilrettelegging = 'arbeidMedTilrettelegging',
}

export interface VelgArbeidFormData {
    [VelgArbeidFormField.arbeidMedTilrettelegging]: string[];
}

export const VelgArbeidFormComponents = getTypedFormComponents<VelgArbeidFormField, VelgArbeidFormData>();
