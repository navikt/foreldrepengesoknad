import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum BostedUtlandFormField {
    land = 'land',
    fom = 'fom',
    tom = 'tom',
}

export interface BostedUtlandFormData {
    [BostedUtlandFormField.land]: string;
    [BostedUtlandFormField.fom]: string;
    [BostedUtlandFormField.tom]: string;
}

export const initialBostedUtlandFormData: BostedUtlandFormData = {
    [BostedUtlandFormField.land]: '',
    [BostedUtlandFormField.fom]: '',
    [BostedUtlandFormField.tom]: '',
};

export const BostedUtlandFormComponents = getTypedFormComponents<BostedUtlandFormField, BostedUtlandFormData>();
