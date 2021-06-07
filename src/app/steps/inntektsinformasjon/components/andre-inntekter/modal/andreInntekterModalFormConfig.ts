import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import { AnnenInntektType } from 'app/context/types/AnnenInntekt';
import { Attachment } from 'app/types/Attachment';

export const enum AndreInntekterFormField {
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
    [AndreInntekterFormField.tom]?: string;
    [AndreInntekterFormField.pågående]: YesOrNo;
    [AndreInntekterFormField.dokumentasjon]: Attachment[];
}

export const AndreInntekterModalFormComponents = getTypedFormComponents<
    AndreInntekterFormField,
    AndreInntekterFormData,
    string
>();
