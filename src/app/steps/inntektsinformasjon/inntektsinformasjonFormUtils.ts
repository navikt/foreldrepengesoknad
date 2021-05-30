import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { InntektsinformasjonFormData, InntektsinformasjonFormField } from './inntektsinformasjonFormConfig';

export const initialInntektsinformasjonFormValues: InntektsinformasjonFormData = {
    [InntektsinformasjonFormField.hattInntektSomFrilans]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattAndreInntekter]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.frilansOppstartsDato]: '',
    [InntektsinformasjonFormField.oppdragForNæreVennerEllerFamilie]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.inntektSomFosterforelder]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.jobberFremdelesSomFrilanser]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattAndreInntekter]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.andreInntekterInformasjon]: [],
    [InntektsinformasjonFormField.egenNæringInformasjon]: [],
};
