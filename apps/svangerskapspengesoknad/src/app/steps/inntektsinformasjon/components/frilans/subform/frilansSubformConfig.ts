import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum FrilansSubformField {
    frilansFom = 'frilansFom',
    frilansTom = 'frilansTom',
    jobberFremdelesSomFrilanser = 'jobberFremdelesSomFrilanser',
}

export interface FrilansSubformData {
    [FrilansSubformField.frilansFom]: string;
    [FrilansSubformField.frilansTom]: string;
    [FrilansSubformField.jobberFremdelesSomFrilanser]: YesOrNo;
}

export const FrilansSubformComponents = getTypedFormComponents<FrilansSubformField, FrilansSubformData>();
