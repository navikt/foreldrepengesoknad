import { AnnenInntekt, AnnenInntektType } from 'app/context/types/AnnenInntekt';
import { Frilans, FrilansOppdrag } from 'app/context/types/Frilans';
import { Næring } from 'app/context/types/Næring';
import Søker from 'app/context/types/Søker';
import { InntektsinformasjonFormData, InntektsinformasjonFormField } from './inntektsinformasjonFormConfig';
import { YesOrNo, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';
import {
    ISOStringToDate,
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common';

export const initialInntektsinformasjonFormValues: InntektsinformasjonFormData = {
    [InntektsinformasjonFormField.hattInntektSomFrilans]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattAndreInntekter]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.frilansOppstartsDato]: '',
    [InntektsinformasjonFormField.jobberFremdelesSomFrilanser]: YesOrNo.UNANSWERED,
};

export const cleanupInvisibleCharsFromNæring = (næring: Næring): Næring => {
    const cleanedNavn = replaceInvisibleCharsWithSpace(næring.navnPåNæringen);
    if (næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår) {
        const cleanedEndringInformasjon = {
            ...næring.endringAvNæringsinntektInformasjon!,
            forklaring: replaceInvisibleCharsWithSpace(næring.endringAvNæringsinntektInformasjon!.forklaring),
        };

        return {
            ...næring,
            navnPåNæringen: cleanedNavn,
            endringAvNæringsinntektInformasjon: cleanedEndringInformasjon,
        };
    }
    return {
        ...næring,
        navnPåNæringen: cleanedNavn,
    };
};

export const cleanupInvisibleCharsFromFrilansinformasjon = (frilansoppdrag: FrilansOppdrag[]): FrilansOppdrag[] => {
    return frilansoppdrag.map((oppdrag: FrilansOppdrag) => ({
        ...oppdrag,
        navnPåArbeidsgiver: replaceInvisibleCharsWithSpace(oppdrag.navnPåArbeidsgiver),
    }));
};

export const cleanupInvisibleCharsFromAndreInntekter = (andreInntekter: AnnenInntekt[]): AnnenInntekt[] => {
    return andreInntekter.map((inntekt) =>
        inntekt.type === AnnenInntektType.JOBB_I_UTLANDET
            ? {
                  ...inntekt,
                  arbeidsgiverNavn: replaceInvisibleCharsWithSpace(inntekt.arbeidsgiverNavn),
              }
            : inntekt,
    );
};

export const mapInntektsinformasjonFormDataToState = (
    values: Partial<InntektsinformasjonFormData>,
    søker: Søker,
    andreInntekter?: AnnenInntekt[],
    næringer?: Næring[],
): Søker => {
    let frilansInformasjon: Frilans | undefined = undefined;

    if (values.hattInntektSomFrilans === YesOrNo.YES) {
        frilansInformasjon = {
            oppstart: ISOStringToDate(values.frilansOppstartsDato)!,
            jobberFremdelesSomFrilans: convertYesOrNoOrUndefinedToBoolean(values.jobberFremdelesSomFrilanser)!,
        };
    }

    return {
        erAleneOmOmsorg: søker.erAleneOmOmsorg,
        språkkode: søker.språkkode,
        harHattAnnenInntektSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(values.hattAndreInntekter)!,
        harJobbetSomFrilansSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(values.hattInntektSomFrilans)!,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(
            values.hattInntektSomNæringsdrivende,
        )!,
        andreInntekterSiste10Mnd:
            values.hattAndreInntekter === YesOrNo.YES ? cleanupInvisibleCharsFromAndreInntekter(andreInntekter!) : [],
        selvstendigNæringsdrivendeInformasjon:
            values.hattInntektSomNæringsdrivende === YesOrNo.YES
                ? næringer!.map((næring) => cleanupInvisibleCharsFromNæring(næring))
                : [],
        frilansInformasjon: values.hattInntektSomFrilans === YesOrNo.YES ? frilansInformasjon : undefined,
    };
};

export const getInitialInntektsinformasjonFormValues = (søker: Søker): InntektsinformasjonFormData => {
    return {
        ...initialInntektsinformasjonFormValues,
        hattAndreInntekter: convertBooleanOrUndefinedToYesOrNo(søker.harHattAnnenInntektSiste10Mnd),
        hattInntektSomNæringsdrivende: convertBooleanOrUndefinedToYesOrNo(
            søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd,
        ),
        hattInntektSomFrilans: convertBooleanOrUndefinedToYesOrNo(søker.harJobbetSomFrilansSiste10Mnd),
        frilansOppstartsDato: søker.frilansInformasjon ? dateToISOString(søker.frilansInformasjon.oppstart) : '',
        jobberFremdelesSomFrilanser: søker.frilansInformasjon
            ? convertBooleanOrUndefinedToYesOrNo(søker.frilansInformasjon.jobberFremdelesSomFrilans)
            : YesOrNo.UNANSWERED,
    };
};
