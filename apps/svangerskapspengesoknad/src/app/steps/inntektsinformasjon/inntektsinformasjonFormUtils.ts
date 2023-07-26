import { InntektsinformasjonFormData, InntektsinformasjonFormField } from './inntektsinformasjonFormConfig';
import { YesOrNo, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';
import { Næring } from 'app/types/Næring';
import { AnnenInntekt, AnnenInntektType } from 'app/types/AnnenInntekt';
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
};

export const cleanupInvisibleCharsFromNæring = (næring: Næring): Næring => {
    const cleanedNavn = replaceInvisibleCharsWithSpace(næring.navnPåNæringen);
    return {
        ...næring,
        navnPåNæringen: cleanedNavn,
    };
};

//TODO: burde dette flyttes til andre inntekter?
export const cleanupInvisibleCharsFromAndreInntekter = (andreInntekter: AnnenInntekt[]): AnnenInntekt[] => {
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
    andreInntekter?: AnnenInntekt[]
): Søker => {
    let frilansInformasjon: Frilans | undefined = undefined;
    let næring: Næring | undefined = undefined;

    if (values.hattInntektSomFrilans === YesOrNo.YES) {
        frilansInformasjon = {
            oppstart: ISOStringToDate(values.frilansOppstartsDato)!,
            sluttDato: ISOStringToDate(values.frilansSluttDato)!,
            jobberFremdelesSomFrilans: convertYesOrNoOrUndefinedToBoolean(values.jobberFremdelesSomFrilanser)!,
        };
    }

    if (values.hattInntektSomNæringsdrivende === YesOrNo.YES) {
        næring = mapEgenNæringFormValuesToState(values);
    }

    return {
        rolle: Søkerrolle.MOR,
        harHattAnnenInntektSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(values.hattAndreInntekter)!,
        harJobbetSomFrilansSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(values.hattInntektSomFrilans)!,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(
            values.hattInntektSomNæringsdrivende
        )!,
        andreInntekterSiste10Mnd:
            values.hattAndreInntekter === YesOrNo.YES ? cleanupInvisibleCharsFromAndreInntekter(andreInntekter!) : [],
        selvstendigNæringsdrivendeInformasjon: næring,
        frilansInformasjon: frilansInformasjon,
    };
};

export const getInitialInntektsinformasjonFormValues = (søker: Søker): InntektsinformasjonFormData => {
    const næring = søker.selvstendigNæringsdrivendeInformasjon;
    return {
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
    };
};

export const cleanupInntektsinformasjonForm = (
    values: InntektsinformasjonFormData,
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>
): InntektsinformasjonFormData => {
    return {
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
    };
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
