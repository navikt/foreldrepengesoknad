import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

export enum InntektsinformasjonFormField {
    hattInntektSomFrilans = 'hattInntektSomFrilans',
    hattInntektSomNæringsdrivende = 'hattInntektSomNæringsdrivende',
    hattAndreInntekter = 'hattAndreInntekter',
    frilansOppstartsDato = 'frilansOppstartsDato',
    jobberFremdelesSomFrilanser = 'jobberFremdelesSomFrilanser',
    oppdragForNæreVennerEllerFamilie = 'oppdragForNæreVennerEllerFamilie',
    inntektSomFosterforelder = 'inntektSomFosterforelder',
}

export interface InntektsinformasjonFormData {
    [InntektsinformasjonFormField.hattInntektSomFrilans]: YesOrNo;
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: YesOrNo;
    [InntektsinformasjonFormField.hattAndreInntekter]: YesOrNo;
    [InntektsinformasjonFormField.frilansOppstartsDato]: string;
    [InntektsinformasjonFormField.inntektSomFosterforelder]: YesOrNo;
    [InntektsinformasjonFormField.jobberFremdelesSomFrilanser]: YesOrNo;
    [InntektsinformasjonFormField.oppdragForNæreVennerEllerFamilie]: YesOrNo;
}

export const InntektsinformasjonFormComponents = getTypedFormComponents<
    InntektsinformasjonFormField,
    InntektsinformasjonFormData
>();
