import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum BostedUtlandSubformField {
    land = 'land',
    fom = 'fom',
    tom = 'tom',
}

export interface BostedUtlandSubformData {
    [BostedUtlandSubformField.land]: string;
    [BostedUtlandSubformField.fom]: string;
    [BostedUtlandSubformField.tom]: string;
}

export const initialBostedUtlandFormData: BostedUtlandSubformData = {
    [BostedUtlandSubformField.land]: '',
    [BostedUtlandSubformField.fom]: '',
    [BostedUtlandSubformField.tom]: '',
};

export const BostedUtlandFormComponents = getTypedFormComponents<BostedUtlandSubformField, BostedUtlandSubformData>();
