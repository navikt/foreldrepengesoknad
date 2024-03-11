import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import dayjs from 'dayjs';

import {
    ISOStringToDate,
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
    hasValue,
} from '@navikt/fp-common';
import { YesOrNo, dateToISOString } from '@navikt/fp-formik';

import { EndringAvNæringsinntektInformasjon, Næring } from 'app/context/types/Næring';
import { date4YearsAgo } from 'app/utils/dateUtils';

import { EgenNæringModalFormData, EgenNæringModalFormField } from './egenNæringModalFormConfig';

export const initialEgenNæringModalValues: EgenNæringModalFormData = {
    [EgenNæringModalFormField.type]: undefined,
    [EgenNæringModalFormField.navnPåNæringen]: '',
    [EgenNæringModalFormField.registrertINorge]: YesOrNo.UNANSWERED,
    [EgenNæringModalFormField.orgnr]: '',
    [EgenNæringModalFormField.land]: '',
    [EgenNæringModalFormField.tom]: '',
    [EgenNæringModalFormField.fom]: '',
    [EgenNæringModalFormField.pågående]: YesOrNo.UNANSWERED,
    [EgenNæringModalFormField.næringsresultat]: '',
    [EgenNæringModalFormField.hattVarigEndringAvNæringsinntektSiste4Kalenderår]: YesOrNo.UNANSWERED,
    [EgenNæringModalFormField.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene]: YesOrNo.UNANSWERED,
    [EgenNæringModalFormField.yrkesAktivDato]: '',
    [EgenNæringModalFormField.datoForEndring]: '',
    [EgenNæringModalFormField.inntektEtterEndring]: '',
    [EgenNæringModalFormField.forklaringEndring]: '',
};

export const cleanupEgenNæringForm = (
    values: EgenNæringModalFormData,
    visibility: QuestionVisibility<EgenNæringModalFormField, undefined>,
): EgenNæringModalFormData => {
    return {
        type: visibility.isVisible(EgenNæringModalFormField.type) ? values.type : undefined,
        navnPåNæringen: visibility.isVisible(EgenNæringModalFormField.navnPåNæringen)
            ? values.navnPåNæringen
            : initialEgenNæringModalValues.navnPåNæringen,
        registrertINorge: visibility.isVisible(EgenNæringModalFormField.registrertINorge)
            ? values.registrertINorge
            : initialEgenNæringModalValues.registrertINorge,
        orgnr: visibility.isVisible(EgenNæringModalFormField.orgnr) ? values.orgnr : initialEgenNæringModalValues.orgnr,
        land: visibility.isVisible(EgenNæringModalFormField.land) ? values.land : initialEgenNæringModalValues.land,
        tom: visibility.isVisible(EgenNæringModalFormField.tom) ? values.tom : initialEgenNæringModalValues.tom,
        fom: visibility.isVisible(EgenNæringModalFormField.fom) ? values.fom : initialEgenNæringModalValues.fom,
        pågående: visibility.isVisible(EgenNæringModalFormField.pågående)
            ? values.pågående
            : initialEgenNæringModalValues.pågående,
        næringsresultat: visibility.isVisible(EgenNæringModalFormField.næringsresultat)
            ? values.næringsresultat
            : initialEgenNæringModalValues.næringsresultat,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår: visibility.isVisible(
            EgenNæringModalFormField.hattVarigEndringAvNæringsinntektSiste4Kalenderår,
        )
            ? values.hattVarigEndringAvNæringsinntektSiste4Kalenderår
            : initialEgenNæringModalValues.hattVarigEndringAvNæringsinntektSiste4Kalenderår,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: visibility.isVisible(
            EgenNæringModalFormField.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        )
            ? values.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
            : initialEgenNæringModalValues.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        yrkesAktivDato: visibility.isVisible(EgenNæringModalFormField.yrkesAktivDato)
            ? values.yrkesAktivDato
            : initialEgenNæringModalValues.yrkesAktivDato,
        datoForEndring: visibility.isVisible(EgenNæringModalFormField.datoForEndring)
            ? values.datoForEndring
            : initialEgenNæringModalValues.datoForEndring,
        inntektEtterEndring: visibility.isVisible(EgenNæringModalFormField.inntektEtterEndring)
            ? values.inntektEtterEndring
            : initialEgenNæringModalValues.inntektEtterEndring,
        forklaringEndring: visibility.isVisible(EgenNæringModalFormField.forklaringEndring)
            ? values.forklaringEndring
            : initialEgenNæringModalValues.forklaringEndring,
    };
};

export const getInitialEgenNæringModalValues = (næring: Næring | undefined): EgenNæringModalFormData => {
    if (!næring) {
        return {
            ...initialEgenNæringModalValues,
        };
    }

    return {
        ...initialEgenNæringModalValues,
        type: næring.næringstyper.length > 0 ? næring.næringstyper[0] : undefined,
        navnPåNæringen: næring.navnPåNæringen,
        registrertINorge: convertBooleanOrUndefinedToYesOrNo(næring.registrertINorge),
        land: næring.registrertILand || '',
        fom: dateToISOString(næring.tidsperiode.fom),
        tom: dateToISOString(næring.tidsperiode.tom) || '',
        orgnr: næring.organisasjonsnummer || '',
        pågående: convertBooleanOrUndefinedToYesOrNo(næring.pågående),
        næringsresultat: næring.næringsinntekt?.toString() || '',
        hattVarigEndringAvNæringsinntektSiste4Kalenderår: convertBooleanOrUndefinedToYesOrNo(
            næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår,
        ),
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: convertBooleanOrUndefinedToYesOrNo(
            næring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        ),
        yrkesAktivDato: dateToISOString(næring.oppstartsdato) || '',
        datoForEndring: næring.endringAvNæringsinntektInformasjon
            ? dateToISOString(næring.endringAvNæringsinntektInformasjon.dato)
            : '',
        inntektEtterEndring: næring.endringAvNæringsinntektInformasjon
            ? næring.endringAvNæringsinntektInformasjon.næringsinntektEtterEndring.toString()
            : '',
        forklaringEndring: næring.endringAvNæringsinntektInformasjon
            ? næring.endringAvNæringsinntektInformasjon.forklaring
            : '',
    };
};

export const mapEgenNæringModalFormValuesToState = (values: Partial<EgenNæringModalFormData>): Næring => {
    let endringAvNæringsinntektInformasjon: EndringAvNæringsinntektInformasjon | undefined = undefined;

    if (values.hattVarigEndringAvNæringsinntektSiste4Kalenderår === YesOrNo.YES) {
        endringAvNæringsinntektInformasjon = {
            dato: ISOStringToDate(values.datoForEndring)!,
            forklaring: values.forklaringEndring!,
            næringsinntektEtterEndring: parseInt(values.inntektEtterEndring!),
        };
    }

    return {
        næringstyper: [values.type!],
        navnPåNæringen: values.navnPåNæringen!,
        registrertINorge: convertYesOrNoOrUndefinedToBoolean(values.registrertINorge)!,
        organisasjonsnummer: hasValue(values.orgnr) ? values.orgnr : undefined,
        registrertILand: hasValue(values.land) ? values.land : undefined,
        tidsperiode: {
            fom: ISOStringToDate(values.fom)!,
            tom: ISOStringToDate(values.tom),
        },
        pågående: convertYesOrNoOrUndefinedToBoolean(values.pågående)!,
        næringsinntekt: hasValue(values.næringsresultat) ? parseInt(values.næringsresultat!, 10) : undefined,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår: convertYesOrNoOrUndefinedToBoolean(
            values.hattVarigEndringAvNæringsinntektSiste4Kalenderår,
        ),
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: convertYesOrNoOrUndefinedToBoolean(
            values.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        ),
        oppstartsdato: hasValue(values.yrkesAktivDato) ? ISOStringToDate(values.yrkesAktivDato) : undefined,
        endringAvNæringsinntektInformasjon: endringAvNæringsinntektInformasjon,
    };
};

export const erVirksomhetRegnetSomNyoppstartet = (oppstartsdato: Date | undefined): boolean => {
    if (!oppstartsdato) {
        return true;
    }

    return dayjs(oppstartsdato).startOf('day').isAfter(date4YearsAgo, 'day');
};
