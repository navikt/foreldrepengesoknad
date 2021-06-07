import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';

export const enum InntektsinformasjonFormField {
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
    InntektsinformasjonFormData,
    string
>();
