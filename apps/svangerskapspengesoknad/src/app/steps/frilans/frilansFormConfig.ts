import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum FrilansFormField {
    frilansFom = 'frilansFom',
    frilansTom = 'frilansTom',
    jobberFremdelesSomFrilanser = 'jobberFremdelesSomFrilanser',
}

export interface FrilansFormData {
    [FrilansFormField.frilansFom]: string;
    [FrilansFormField.frilansTom]: string;
    [FrilansFormField.jobberFremdelesSomFrilanser]: YesOrNo;
}

export const FrilansFormComponents = getTypedFormComponents<FrilansFormField, FrilansFormData>();
