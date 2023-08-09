import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum InntektsinformasjonFormField {
    hattInntektSomFrilans = 'hattInntektSomFrilans',
    hattInntektSomNæringsdrivende = 'hattInntektSomNæringsdrivende',
    hattArbeidIUtlandet = 'hattArbeidIUtlandet',
    tilrettelegging = 'tilrettelegging',
}

export interface InntektsinformasjonFormData {
    [InntektsinformasjonFormField.hattInntektSomFrilans]: YesOrNo;
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: YesOrNo;
    [InntektsinformasjonFormField.hattArbeidIUtlandet]: YesOrNo;
    [InntektsinformasjonFormField.tilrettelegging]: string[];
}

export const InntektsinformasjonFormComponents = getTypedFormComponents<
    InntektsinformasjonFormField,
    InntektsinformasjonFormData
>();
