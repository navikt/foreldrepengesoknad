import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum InntektsinformasjonFormField {
    hattInntektSomFrilans = 'hattInntektSomFrilans',
    hattInntektSomNæringsdrivende = 'hattInntektSomNæringsdrivende',
    hattArbeidIUtlandet = 'hattArbeidIUtlandet',
}

export interface InntektsinformasjonFormData {
    [InntektsinformasjonFormField.hattInntektSomFrilans]: YesOrNo;
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: YesOrNo;
    [InntektsinformasjonFormField.hattArbeidIUtlandet]: YesOrNo;
}

export const InntektsinformasjonFormComponents = getTypedFormComponents<
    InntektsinformasjonFormField,
    InntektsinformasjonFormData
>();
