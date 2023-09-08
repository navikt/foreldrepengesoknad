import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

export enum ArbeidIUtlandetSubformField {
    arbeidIUtlandetLand = 'arbeidIUtlandetLand',
    arbeidIUtlandetNavnArbeidsgiver = 'arbeidIUtlandetNavnArbeidsgiver',
    arbeidIUtlandetFom = 'arbeidIUtlandetFom',
    arbeidIUtlandetErPågående = 'arbeidIUtlandetErPågående',
    arbeidIUtlandetTom = 'arbeidIUtlandetTom',
}

export interface ArbeidIUtlandetSubformData {
    [ArbeidIUtlandetSubformField.arbeidIUtlandetLand]: string;
    [ArbeidIUtlandetSubformField.arbeidIUtlandetNavnArbeidsgiver]: string;
    [ArbeidIUtlandetSubformField.arbeidIUtlandetFom]: string;
    [ArbeidIUtlandetSubformField.arbeidIUtlandetErPågående]: YesOrNo;
    [ArbeidIUtlandetSubformField.arbeidIUtlandetTom]: string;
}

export const ArbeidIUtlandetSubformComponents = getTypedFormComponents<
    ArbeidIUtlandetSubformField,
    ArbeidIUtlandetSubformData
>();
