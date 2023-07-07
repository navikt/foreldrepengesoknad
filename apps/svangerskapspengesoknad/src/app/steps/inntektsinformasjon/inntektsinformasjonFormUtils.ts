import { InntektsinformasjonFormData, InntektsinformasjonFormField } from './inntektsinformasjonFormConfig';
import { YesOrNo, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';
import { Næring } from 'app/types/Næring';
import { AnnenInntekt, AnnenInntektType } from 'app/types/AnnenInntekt';
import { Frilans, FrilansOppdrag } from 'app/types/Frilans';
import { ISOStringToDate } from '@navikt/fp-common';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';
import { Søker, Søkerrolle } from 'app/types/Søker';

export const initialInntektsinformasjonFormValues: InntektsinformasjonFormData = {
    [InntektsinformasjonFormField.hattInntektSomFrilans]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattInntektSomNæringsdrivende]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.hattAndreInntekter]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.frilansOppstartsDato]: '',
    [InntektsinformasjonFormField.oppdragForNæreVennerEllerFamilie]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.inntektSomFosterforelder]: YesOrNo.UNANSWERED,
    [InntektsinformasjonFormField.jobberFremdelesSomFrilanser]: YesOrNo.UNANSWERED,
};

const cleanUpRegnskapsførerNæring = (næring: Næring): Næring => {
    if (næring.harRegnskapsfører) {
        return {
            ...næring,
            regnskapsfører: {
                ...næring.regnskapsfører!,
                navn: replaceInvisibleCharsWithSpace(næring.regnskapsfører!.navn),
            },
        };
    }
    return næring;
};

export const cleanupInvisibleCharsFromNæring = (næring: Næring): Næring => {
    const cleanedNavn = replaceInvisibleCharsWithSpace(næring.navnPåNæringen);
    if (næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår) {
        const cleanedEndringInformasjon = {
            ...næring.endringAvNæringsinntektInformasjon!,
            forklaring: replaceInvisibleCharsWithSpace(næring.endringAvNæringsinntektInformasjon!.forklaring),
        };

        return {
            ...cleanUpRegnskapsførerNæring(næring),
            navnPåNæringen: cleanedNavn,
            endringAvNæringsinntektInformasjon: cleanedEndringInformasjon,
        };
    }
    return {
        ...cleanUpRegnskapsførerNæring(næring),
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
            : inntekt
    );
};

export const mapInntektsinformasjonFormDataToState = (
    values: Partial<InntektsinformasjonFormData>,
    andreInntekter?: AnnenInntekt[],
    frilansoppdrag?: FrilansOppdrag[],
    næringer?: Næring[]
): Søker => {
    let frilansInformasjon: Frilans | undefined = undefined;

    if (values.hattInntektSomFrilans === YesOrNo.YES) {
        frilansInformasjon = {
            oppstart: ISOStringToDate(values.frilansOppstartsDato)!,
            jobberFremdelesSomFrilans: convertYesOrNoOrUndefinedToBoolean(values.jobberFremdelesSomFrilanser)!,
            harJobbetForNærVennEllerFamilieSiste10Mnd: convertYesOrNoOrUndefinedToBoolean(
                values.oppdragForNæreVennerEllerFamilie
            )!,
            driverFosterhjem: convertYesOrNoOrUndefinedToBoolean(values.inntektSomFosterforelder),
            oppdragForNæreVennerEllerFamilieSiste10Mnd: cleanupInvisibleCharsFromFrilansinformasjon(frilansoppdrag!),
        };
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
            søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd
        ),
        hattInntektSomFrilans: convertBooleanOrUndefinedToYesOrNo(søker.harJobbetSomFrilansSiste10Mnd),
        frilansOppstartsDato: søker.frilansInformasjon ? dateToISOString(søker.frilansInformasjon.oppstart) : '',
        inntektSomFosterforelder: søker.frilansInformasjon
            ? convertBooleanOrUndefinedToYesOrNo(søker.frilansInformasjon.driverFosterhjem)
            : YesOrNo.UNANSWERED,
        jobberFremdelesSomFrilanser: søker.frilansInformasjon
            ? convertBooleanOrUndefinedToYesOrNo(søker.frilansInformasjon.jobberFremdelesSomFrilans)
            : YesOrNo.UNANSWERED,
        oppdragForNæreVennerEllerFamilie: søker.frilansInformasjon
            ? convertBooleanOrUndefinedToYesOrNo(søker.frilansInformasjon.harJobbetForNærVennEllerFamilieSiste10Mnd)
            : YesOrNo.UNANSWERED,
    };
};
