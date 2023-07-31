import { InntektsinformasjonFormData, InntektsinformasjonFormField } from './inntektsinformasjonFormConfig';
import { YesOrNo, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';
import { Næring } from 'app/types/Næring';
import { ArbeidIUtlandet, AnnenInntektType } from 'app/types/ArbeidIUtlandet';
import { Frilans } from 'app/types/Frilans';
import { ISOStringToDate } from '@navikt/fp-common';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';
import { Søker, Søkerrolle } from 'app/types/Søker';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { date4YearsAgo } from 'app/utils/dateUtils';
import dayjs from 'dayjs';
import { hasValue } from 'app/utils/validationUtils';

export const initialInntektsinformasjonFormValues: InntektsinformasjonFormData = {
    [InntektsinformasjonFormField.hattInntektSomFrilans]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattAndreInntekter]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.frilansOppstartsDato]: '',
    [InntektsinformasjonFormField.frilansSluttDato]: '',
    [InntektsinformasjonFormField.jobberFremdelesSomFrilanser]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.egenNæringType]: undefined,
    [InntektsinformasjonFormField.egenNæringNavn]: '',
    [InntektsinformasjonFormField.egenNæringRegistrertINorge]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.egenNæringOrgnr]: '',
    [InntektsinformasjonFormField.egenNæringLand]: '',
    [InntektsinformasjonFormField.egenNæringTom]: '',
    [InntektsinformasjonFormField.egenNæringFom]: '',
    [InntektsinformasjonFormField.egenNæringPågående]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.egenNæringResultat]: '',
    [InntektsinformasjonFormField.egenNæringBlittYrkesaktivDe3SisteÅrene]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.egenNæringYrkesAktivDato]: '',
    [InntektsinformasjonFormField.arbeidIUtlandetLand]: '',
    [InntektsinformasjonFormField.arbeidIUtlandetNavnArbeidsgiver]: '',
    [InntektsinformasjonFormField.arbeidIUtlandetFom]: '',
    [InntektsinformasjonFormField.arbeidIUtlandetPågående]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.arbeidIUtlandetTom]: '',
};

export const cleanupInvisibleCharsFromNæring = (næring: Næring): Næring => {
    const cleanedNavn = replaceInvisibleCharsWithSpace(næring.navnPåNæringen);
    return {
        ...næring,
        navnPåNæringen: cleanedNavn,
    };
};

export const cleanupInvisibleCharsFromArbeidIUtlandet = (andreInntekter: ArbeidIUtlandet[]): ArbeidIUtlandet[] => {
    return andreInntekter.map((inntekt) =>
        inntekt.type === AnnenInntektType.JOBB_I_UTLANDET
            ? {
                  ...inntekt,
                  arbeidsgiverNavn: replaceInvisibleCharsWithSpace(inntekt.arbeidsgiverNavn),
              }
            : inntekt
    );
};

export const mapInntektsinformasjonFormDataToState = (
    values: Partial<InntektsinformasjonFormData>,
    frilans: Frilans | undefined,
    næring: Næring | undefined,
    arbeidIUtlandet: ArbeidIUtlandet[]
): Søker => {
    return {
        rolle: Søkerrolle.MOR,
        harHattAnnenInntektSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(values.hattAndreInntekter)!,
        harJobbetSomFrilansSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(values.hattInntektSomFrilans)!,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(
            values.hattInntektSomNæringsdrivende
        )!,
        andreInntekterSiste10Mnd:
            values.hattAndreInntekter === YesOrNo.YES ? cleanupInvisibleCharsFromArbeidIUtlandet(arbeidIUtlandet!) : [],
        selvstendigNæringsdrivendeInformasjon:
            values.hattInntektSomNæringsdrivende === YesOrNo.YES ? cleanupInvisibleCharsFromNæring(næring!) : undefined,
        frilansInformasjon: frilans,
    };
};

export const getInitialInntektsinformasjonFormValues = (
    søker: Søker,
    selectedAnnenInntekt: ArbeidIUtlandet | undefined
): InntektsinformasjonFormData => {
    const næring = søker.selvstendigNæringsdrivendeInformasjon;
    const init = {
        ...initialInntektsinformasjonFormValues,
        hattAndreInntekter: convertBooleanOrUndefinedToYesOrNo(søker.harHattAnnenInntektSiste10Mnd),
        hattInntektSomNæringsdrivende: convertBooleanOrUndefinedToYesOrNo(
            søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd
        ),
        hattInntektSomFrilans: convertBooleanOrUndefinedToYesOrNo(søker.harJobbetSomFrilansSiste10Mnd),
        frilansOppstartsDato: søker.frilansInformasjon ? dateToISOString(søker.frilansInformasjon.oppstart) : '',
        frilansSluttDato: søker.frilansInformasjon ? dateToISOString(søker.frilansInformasjon.sluttDato) : '',
        jobberFremdelesSomFrilanser: søker.frilansInformasjon
            ? convertBooleanOrUndefinedToYesOrNo(søker.frilansInformasjon.jobberFremdelesSomFrilans)
            : YesOrNo.UNANSWERED,
        egenNæringType: næring?.næringstype,
        egenNæringNavn: næring?.navnPåNæringen || '',
        egenNæringRegistrertINorge: convertBooleanOrUndefinedToYesOrNo(næring?.registrertINorge),
        egenNæringLand: næring?.registrertILand || '',
        egenNæringFom: dateToISOString(næring?.tidsperiode.fom),
        egenNæringTom: dateToISOString(næring?.tidsperiode.tom) || '',
        egenNæringOrgnr: næring?.organisasjonsnummer || '',
        egenNæringPågående: convertBooleanOrUndefinedToYesOrNo(næring?.pågående),
        egenNæringResultat: næring?.næringsinntekt?.toString() || '',
        egenNæringBlittYrkesaktivDe3SisteÅrene: convertBooleanOrUndefinedToYesOrNo(
            næring?.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
        ),
        egenNæringYrkesAktivDato: dateToISOString(næring?.oppstartsdato) || '',
        arbeidIUtlandetLand: selectedAnnenInntekt
            ? selectedAnnenInntekt.land
            : initialInntektsinformasjonFormValues.arbeidIUtlandetLand,
        arbeidIUtlandetNavnArbeidsgiver: selectedAnnenInntekt
            ? selectedAnnenInntekt.arbeidsgiverNavn
            : initialInntektsinformasjonFormValues.arbeidIUtlandetNavnArbeidsgiver,
        arbeidIUtlandetFom: selectedAnnenInntekt
            ? selectedAnnenInntekt.tidsperiode.fom
            : initialInntektsinformasjonFormValues.arbeidIUtlandetFom,
        arbeidIUtlandetPågående: selectedAnnenInntekt
            ? convertBooleanOrUndefinedToYesOrNo(selectedAnnenInntekt.pågående)
            : initialInntektsinformasjonFormValues.arbeidIUtlandetPågående,
        arbeidIUtlandetTom: selectedAnnenInntekt
            ? selectedAnnenInntekt.tidsperiode.tom || ''
            : initialInntektsinformasjonFormValues.arbeidIUtlandetTom,
    };
    return init;
};

export const cleanupInntektsinformasjonForm = (
    values: InntektsinformasjonFormData,
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>
): InntektsinformasjonFormData => {
    const a = {
        hattInntektSomFrilans: visibility.isVisible(InntektsinformasjonFormField.hattInntektSomFrilans)
            ? values.hattInntektSomFrilans
            : initialInntektsinformasjonFormValues.hattInntektSomFrilans,
        frilansOppstartsDato: visibility.isVisible(InntektsinformasjonFormField.frilansOppstartsDato)
            ? values.frilansOppstartsDato
            : initialInntektsinformasjonFormValues.frilansOppstartsDato,
        jobberFremdelesSomFrilanser: visibility.isVisible(InntektsinformasjonFormField.jobberFremdelesSomFrilanser)
            ? values.jobberFremdelesSomFrilanser
            : initialInntektsinformasjonFormValues.jobberFremdelesSomFrilanser,
        frilansSluttDato: visibility.isVisible(InntektsinformasjonFormField.frilansSluttDato)
            ? values.frilansSluttDato
            : initialInntektsinformasjonFormValues.frilansSluttDato,
        hattAndreInntekter: visibility.isVisible(InntektsinformasjonFormField.hattAndreInntekter)
            ? values.hattAndreInntekter
            : initialInntektsinformasjonFormValues.hattAndreInntekter,
        hattInntektSomNæringsdrivende: visibility.isVisible(InntektsinformasjonFormField.hattInntektSomNæringsdrivende)
            ? values.hattInntektSomNæringsdrivende
            : initialInntektsinformasjonFormValues.hattInntektSomNæringsdrivende,
        egenNæringType: visibility.isVisible(InntektsinformasjonFormField.egenNæringType)
            ? values.egenNæringType
            : undefined,
        egenNæringNavn: visibility.isVisible(InntektsinformasjonFormField.egenNæringNavn)
            ? values.egenNæringNavn
            : initialInntektsinformasjonFormValues.egenNæringNavn,
        egenNæringRegistrertINorge: visibility.isVisible(InntektsinformasjonFormField.egenNæringRegistrertINorge)
            ? values.egenNæringRegistrertINorge
            : initialInntektsinformasjonFormValues.egenNæringRegistrertINorge,
        egenNæringOrgnr: visibility.isVisible(InntektsinformasjonFormField.egenNæringOrgnr)
            ? values.egenNæringOrgnr
            : initialInntektsinformasjonFormValues.egenNæringOrgnr,
        egenNæringLand: visibility.isVisible(InntektsinformasjonFormField.egenNæringLand)
            ? values.egenNæringLand
            : initialInntektsinformasjonFormValues.egenNæringLand,
        egenNæringTom: visibility.isVisible(InntektsinformasjonFormField.egenNæringTom)
            ? values.egenNæringTom
            : initialInntektsinformasjonFormValues.egenNæringTom,
        egenNæringFom: visibility.isVisible(InntektsinformasjonFormField.egenNæringFom)
            ? values.egenNæringFom
            : initialInntektsinformasjonFormValues.egenNæringFom,
        egenNæringPågående: visibility.isVisible(InntektsinformasjonFormField.egenNæringPågående)
            ? values.egenNæringPågående
            : initialInntektsinformasjonFormValues.egenNæringPågående,
        egenNæringResultat: visibility.isVisible(InntektsinformasjonFormField.egenNæringResultat)
            ? values.egenNæringResultat
            : initialInntektsinformasjonFormValues.egenNæringResultat,
        egenNæringBlittYrkesaktivDe3SisteÅrene: visibility.isVisible(
            InntektsinformasjonFormField.egenNæringBlittYrkesaktivDe3SisteÅrene
        )
            ? values.egenNæringBlittYrkesaktivDe3SisteÅrene
            : initialInntektsinformasjonFormValues.egenNæringBlittYrkesaktivDe3SisteÅrene,
        egenNæringYrkesAktivDato: visibility.isVisible(InntektsinformasjonFormField.egenNæringYrkesAktivDato)
            ? values.egenNæringYrkesAktivDato
            : initialInntektsinformasjonFormValues.egenNæringYrkesAktivDato,
        arbeidIUtlandetLand: visibility.isVisible(InntektsinformasjonFormField.arbeidIUtlandetLand)
            ? values.arbeidIUtlandetLand
            : initialInntektsinformasjonFormValues.arbeidIUtlandetLand,
        arbeidIUtlandetNavnArbeidsgiver: visibility.isVisible(
            InntektsinformasjonFormField.arbeidIUtlandetNavnArbeidsgiver
        )
            ? values.arbeidIUtlandetNavnArbeidsgiver
            : initialInntektsinformasjonFormValues.arbeidIUtlandetNavnArbeidsgiver,
        arbeidIUtlandetFom: visibility.isVisible(InntektsinformasjonFormField.arbeidIUtlandetFom)
            ? values.arbeidIUtlandetFom
            : initialInntektsinformasjonFormValues.arbeidIUtlandetFom,
        arbeidIUtlandetPågående: visibility.isVisible(InntektsinformasjonFormField.arbeidIUtlandetPågående)
            ? values.arbeidIUtlandetPågående
            : initialInntektsinformasjonFormValues.arbeidIUtlandetPågående,
        arbeidIUtlandetTom: visibility.isVisible(InntektsinformasjonFormField.arbeidIUtlandetTom)
            ? values.arbeidIUtlandetTom
            : initialInntektsinformasjonFormValues.arbeidIUtlandetTom,
    };
    return a;
};

export const erVirksomhetRegnetSomNyoppstartet = (oppstartsdato: Date | undefined): boolean => {
    if (!oppstartsdato) {
        return true;
    }

    return dayjs(oppstartsdato).startOf('day').isAfter(date4YearsAgo, 'day');
};

export const mapEgenNæringFormValuesToState = (formValues: Partial<InntektsinformasjonFormData>): Næring => {
    return {
        næringstype: formValues.egenNæringType!,
        tidsperiode: {
            fom: ISOStringToDate(formValues.egenNæringFom)!,
            tom: ISOStringToDate(formValues.egenNæringTom),
        },
        pågående: convertYesOrNoOrUndefinedToBoolean(formValues.egenNæringPågående)!,
        næringsinntekt: hasValue(formValues.egenNæringResultat)
            ? parseInt(formValues.egenNæringResultat!, 10)
            : undefined,
        navnPåNæringen: formValues.egenNæringNavn!,
        organisasjonsnummer: hasValue(formValues.egenNæringOrgnr) ? formValues.egenNæringOrgnr : undefined,
        registrertINorge: convertYesOrNoOrUndefinedToBoolean(formValues.egenNæringRegistrertINorge)!,
        registrertILand: hasValue(formValues.egenNæringLand) ? formValues.egenNæringLand : undefined,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: convertYesOrNoOrUndefinedToBoolean(
            formValues.egenNæringBlittYrkesaktivDe3SisteÅrene
        )!,
        oppstartsdato: ISOStringToDate(formValues.egenNæringYrkesAktivDato),
    };
};

export const mapArbeidIUtlandetFormValuesToState = (values: Partial<InntektsinformasjonFormData>): ArbeidIUtlandet => {
    return {
        arbeidsgiverNavn: values.arbeidIUtlandetNavnArbeidsgiver!,
        land: values.arbeidIUtlandetLand!,
        pågående: convertYesOrNoOrUndefinedToBoolean(values.arbeidIUtlandetPågående)!,
        tidsperiode: {
            fom: values.arbeidIUtlandetFom!,
            tom: values.arbeidIUtlandetTom,
        },
        type: AnnenInntektType.JOBB_I_UTLANDET,
    };
};
