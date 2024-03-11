import { YesOrNo, getTypedFormComponents } from '@navikt/fp-formik';
import { Attachment } from '@navikt/fp-types';

import { AnnenInntektType } from 'app/context/types/AnnenInntekt';

export enum AndreInntekterFormField {
    type = 'type',
    navnPåArbeidsgiver = 'navnPåArbeidsgiver',
    land = 'land',
    fom = 'fom',
    tom = 'tom',
    pågående = 'pågående',
    dokumentasjon = 'dokumentasjon',
}

export interface AndreInntekterFormData {
    [AndreInntekterFormField.type]: AnnenInntektType | undefined;
    [AndreInntekterFormField.navnPåArbeidsgiver]: string;
    [AndreInntekterFormField.land]: string;
    [AndreInntekterFormField.fom]: string;
    [AndreInntekterFormField.tom]: string;
    [AndreInntekterFormField.pågående]: YesOrNo;
    [AndreInntekterFormField.dokumentasjon]: Attachment[];
}

export const AndreInntekterModalFormComponents = getTypedFormComponents<
    AndreInntekterFormField,
    AndreInntekterFormData
>();
