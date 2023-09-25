import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { ArbeidIUtlandetInput } from 'app/types/ArbeidIUtlandet';

export enum ArbeidIUtlandetFormField {
    arbeidIUtlandet = 'arbeidIUtlandet',
}

export interface ArbeidIUtlandetFormData {
    [ArbeidIUtlandetFormField.arbeidIUtlandet]: ArbeidIUtlandetInput[];
}

export const ArbeidIUtlandetFormComponents = getTypedFormComponents<
    ArbeidIUtlandetFormField | string,
    ArbeidIUtlandetFormData
>();
