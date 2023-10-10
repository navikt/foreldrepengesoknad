import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { PeriodeMedVariasjon } from 'app/types/Tilrettelegging';

export enum PerioderFormField {
    varierendePerioder = 'varierendePerioder',
}

export interface PerioderFormData {
    [PerioderFormField.varierendePerioder]: PeriodeMedVariasjon[];
}

export const PerioderFormComponents = getTypedFormComponents<PerioderFormField | string, PerioderFormData>();
