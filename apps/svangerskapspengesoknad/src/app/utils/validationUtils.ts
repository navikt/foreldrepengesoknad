import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';

export const hasValue = (v: any) => v !== '' && v !== undefined && v !== null && v !== YesOrNo.UNANSWERED;
