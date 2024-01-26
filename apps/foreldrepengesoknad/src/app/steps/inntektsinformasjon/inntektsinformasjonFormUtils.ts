import { AnnenInntekt, AnnenInntektType } from 'app/context/types/AnnenInntekt';
import { Frilans, FrilansOppdrag } from 'app/context/types/Frilans';
import { Næring } from 'app/context/types/Næring';
import SøkerData from 'app/context/types/SøkerData';
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
    andreInntekter?: AnnenInntekt[],
    næringer?: Næring[],
): SøkerData => {
    let frilansInformasjon: Frilans | undefined = undefined;

    if (values.hattInntektSomFrilans === YesOrNo.YES) {
        frilansInformasjon = {
            oppstart: ISOStringToDate(values.frilansOppstartsDato)!,
            jobberFremdelesSomFrilans: convertYesOrNoOrUndefinedToBoolean(values.jobberFremdelesSomFrilanser)!,
        };
    }

    return {
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

export const getInitialInntektsinformasjonFormValues = (søkerData: SøkerData): InntektsinformasjonFormData => {
    return {
        ...initialInntektsinformasjonFormValues,
        hattAndreInntekter: convertBooleanOrUndefinedToYesOrNo(søkerData.harHattAnnenInntektSiste10Mnd),
        hattInntektSomNæringsdrivende: convertBooleanOrUndefinedToYesOrNo(
            søkerData.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd,
        ),
        hattInntektSomFrilans: convertBooleanOrUndefinedToYesOrNo(søkerData.harJobbetSomFrilansSiste10Mnd),
        frilansOppstartsDato: søkerData.frilansInformasjon
            ? dateToISOString(søkerData.frilansInformasjon.oppstart)
            : '',
        jobberFremdelesSomFrilanser: søkerData.frilansInformasjon
            ? convertBooleanOrUndefinedToYesOrNo(søkerData.frilansInformasjon.jobberFremdelesSomFrilans)
            : YesOrNo.UNANSWERED,
    };
};
