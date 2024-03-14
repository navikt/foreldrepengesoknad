import { YesOrNo, getTypedFormComponents } from '@navikt/fp-formik';

export enum InntektsinformasjonFormField {
    hattInntektSomFrilans = 'hattInntektSomFrilans',
    hattInntektSomNæringsdrivende = 'hattInntektSomNæringsdrivende',
    hattAndreInntekter = 'hattAndreInntekter',
    frilansOppstartsDato = 'frilansOppstartsDato',
    jobberFremdelesSomFrilanser = 'jobberFremdelesSomFrilanser',
}

export interface InntektsinformasjonFormData {
    [InntektsinformasjonFormField.hattInntektSomFrilans]: YesOrNo;
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: YesOrNo;
    [InntektsinformasjonFormField.hattAndreInntekter]: YesOrNo;
    [InntektsinformasjonFormField.frilansOppstartsDato]: string;
    [InntektsinformasjonFormField.jobberFremdelesSomFrilanser]: YesOrNo;
}

export const InntektsinformasjonFormComponents = getTypedFormComponents<
    InntektsinformasjonFormField,
    InntektsinformasjonFormData
>();
