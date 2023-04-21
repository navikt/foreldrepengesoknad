import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum FrilansoppdragModalFormField {
    navnOppdragsgiver = 'navnOppdragsgiver',
    fom = 'fom',
    tom = 'tom',
    pågående = 'pågående',
}

export interface FrilansoppdragModalFormData {
    [FrilansoppdragModalFormField.navnOppdragsgiver]: string;
    [FrilansoppdragModalFormField.fom]: string;
    [FrilansoppdragModalFormField.tom]: string;
    [FrilansoppdragModalFormField.pågående]: YesOrNo;
}

export const FrilansoppdragModalFormComponents = getTypedFormComponents<
    FrilansoppdragModalFormField,
    FrilansoppdragModalFormData,
    string
>();
