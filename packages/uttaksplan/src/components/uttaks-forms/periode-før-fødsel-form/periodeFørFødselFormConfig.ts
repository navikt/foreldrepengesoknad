import { getTypedFormComponents } from '@navikt/fp-formik';

export enum PeriodeFørFødselFormField {
    fom = 'fom',
    tom = 'tom',
    skalIkkeHaUttakFørTermin = 'skalIkkeHaUttakFørTermin',
}

export interface PeriodeFørFødselFormData {
    [PeriodeFørFødselFormField.fom]: Date | undefined;
    [PeriodeFørFødselFormField.tom]: Date | undefined;
    [PeriodeFørFødselFormField.skalIkkeHaUttakFørTermin]: boolean;
}

export const PeriodeFørFødselFormComponents = getTypedFormComponents<
    PeriodeFørFødselFormField,
    PeriodeFørFødselFormData
>();
