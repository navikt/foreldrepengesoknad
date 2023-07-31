import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { Næringstype } from 'app/types/Næring';

export enum InntektsinformasjonFormField {
    hattInntektSomFrilans = 'hattInntektSomFrilans',
    hattInntektSomNæringsdrivende = 'hattInntektSomNæringsdrivende',
    hattArbeidIUtlandet = 'hattArbeidIUtlandet',
    frilansFom = 'frilansFom',
    frilansTom = 'frilansTom',
    jobberFremdelesSomFrilanser = 'jobberFremdelesSomFrilanser',
    egenNæringType = 'egenNæringType',
    egenNæringNavn = 'egenNæringNavn',
    egenNæringRegistrertINorge = 'egenNæringRegistrertINorge',
    egenNæringOrgnr = 'egenNæringOrgnr',
    egenNæringLand = 'egenNæringLand',
    egenNæringFom = 'egenNæringFom',
    egenNæringTom = 'egenNæringTom',
    egenNæringPågående = 'egenNæringPågående',
    egenNæringYrkesAktivDato = 'egenNæringYrkesAktivDato',
    egenNæringResultat = 'egenNæringResultat',
    egenNæringBlittYrkesaktivDe3SisteÅrene = 'egenNæringBlittYrkesaktivDe3SisteÅrene',
    arbeidIUtlandetLand = 'arbeidIUtlandetLand',
    arbeidIUtlandetNavnArbeidsgiver = 'arbeidIUtlandetNavnArbeidsgiver',
    arbeidIUtlandetFom = 'arbeidIUtlandetFom',
    arbeidIUtlandetPågående = 'arbeidIUtlandetPågående',
    arbeidIUtlandetTom = 'arbeidIUtlandetTom',
}

export interface InntektsinformasjonFormData {
    [InntektsinformasjonFormField.hattInntektSomFrilans]: YesOrNo;
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: YesOrNo;
    [InntektsinformasjonFormField.hattArbeidIUtlandet]: YesOrNo;
    [InntektsinformasjonFormField.frilansFom]: string;
    [InntektsinformasjonFormField.frilansTom]: string;
    [InntektsinformasjonFormField.jobberFremdelesSomFrilanser]: YesOrNo;
    [InntektsinformasjonFormField.egenNæringType]: Næringstype | undefined;
    [InntektsinformasjonFormField.egenNæringNavn]: string;
    [InntektsinformasjonFormField.egenNæringRegistrertINorge]: YesOrNo;
    [InntektsinformasjonFormField.egenNæringOrgnr]: string;
    [InntektsinformasjonFormField.egenNæringLand]: string;
    [InntektsinformasjonFormField.egenNæringFom]: string;
    [InntektsinformasjonFormField.egenNæringTom]: string;
    [InntektsinformasjonFormField.egenNæringPågående]: YesOrNo;
    [InntektsinformasjonFormField.egenNæringYrkesAktivDato]: string;
    [InntektsinformasjonFormField.egenNæringResultat]: string;
    [InntektsinformasjonFormField.egenNæringBlittYrkesaktivDe3SisteÅrene]: YesOrNo;
    [InntektsinformasjonFormField.arbeidIUtlandetLand]: string;
    [InntektsinformasjonFormField.arbeidIUtlandetNavnArbeidsgiver]: string;
    [InntektsinformasjonFormField.arbeidIUtlandetFom]: string;
    [InntektsinformasjonFormField.arbeidIUtlandetPågående]: YesOrNo;
    [InntektsinformasjonFormField.arbeidIUtlandetTom]: string;
}

export const InntektsinformasjonFormComponents = getTypedFormComponents<
    InntektsinformasjonFormField,
    InntektsinformasjonFormData
>();
