import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { PeriodeMedVariasjon } from 'app/types/Tilrettelegging';

export enum PerioderFormField {
    variertePerioder = 'variertePerioder',
}

export interface PerioderFormData {
    [PerioderFormField.variertePerioder]: PeriodeMedVariasjon[];
}

export const PerioderFormComponents = getTypedFormComponents<PerioderFormField | string, PerioderFormData>();
