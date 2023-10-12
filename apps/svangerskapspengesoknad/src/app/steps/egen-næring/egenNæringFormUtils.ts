import { EgenNæringFormData, EgenNæringFormField, initialEgenNæringFormData } from './egenNæringFormConfig';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';
import { EgenNæring } from 'app/types/EgenNæring';
import dayjs from 'dayjs';
import { date4YearsAgo } from 'app/utils/dateUtils';
import { QuestionVisibility } from '@navikt/sif-common-formik-ds/lib';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';
import { Søker } from 'app/types/Søker';
import { hasValue } from 'app/utils/validationUtils';

export const erVirksomhetRegnetSomNyoppstartet = (oppstartsdato: Date | undefined): boolean => {
    if (!oppstartsdato) {
        return true;
    }

    return dayjs(oppstartsdato).startOf('day').isAfter(date4YearsAgo, 'day');
};

export const mapEgenNæringFormValuesToState = (formValues: EgenNæringFormData): EgenNæring => {
    const hattVarigEndring = convertYesOrNoOrUndefinedToBoolean(formValues.egenNæringHattVarigEndringDeSiste4Årene);
    return {
        næringstyper: [formValues.egenNæringType],
        tidsperiode: {
            fom: formValues.egenNæringFom,
            tom: formValues.egenNæringTom,
        },
        pågående: convertYesOrNoOrUndefinedToBoolean(formValues.egenNæringPågående)!,
        næringsinntekt: hasValue(formValues.egenNæringResultat) ? formValues.egenNæringResultat : undefined,
        navnPåNæringen: replaceInvisibleCharsWithSpace(formValues.egenNæringNavn),
        organisasjonsnummer: hasValue(formValues.egenNæringOrgnr) ? formValues.egenNæringOrgnr : undefined,
        registrertINorge: convertYesOrNoOrUndefinedToBoolean(formValues.egenNæringRegistrertINorge)!,
        registrertILand: hasValue(formValues.egenNæringLand) ? formValues.egenNæringLand : undefined,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: convertYesOrNoOrUndefinedToBoolean(
            formValues.egenNæringBlittYrkesaktivDe3SisteÅrene,
        )!,
        oppstartsdato: formValues.egenNæringYrkesAktivDato,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår: hattVarigEndring,
        varigEndringBeskrivelse:
            hattVarigEndring && formValues.egenNæringVarigEndringBeskrivelse
                ? replaceInvisibleCharsWithSpace(formValues.egenNæringVarigEndringBeskrivelse)
                : undefined,
        varigEndringDato: formValues.egenNæringVarigEndringDato,
        varigEndringInntektEtterEndring: formValues.egenNæringVarigEndringInntektEtterEndring,
    };
};

export const getInitialEgenNæringFormValues = (næring: EgenNæring | undefined): EgenNæringFormData => {
    if (næring === undefined) {
        return initialEgenNæringFormData;
    }

    return {
        ...initialEgenNæringFormData,
        egenNæringType: næring.næringstyper[0],
        egenNæringNavn: næring.navnPåNæringen || '',
        egenNæringRegistrertINorge: convertBooleanOrUndefinedToYesOrNo(næring.registrertINorge),
        egenNæringLand: næring.registrertILand || '',
        egenNæringFom: næring.tidsperiode.fom,
        egenNæringTom: næring.tidsperiode.tom,
        egenNæringOrgnr: næring.organisasjonsnummer || '',
        egenNæringPågående: convertBooleanOrUndefinedToYesOrNo(næring.pågående),
        egenNæringResultat: næring.næringsinntekt || '',
        egenNæringBlittYrkesaktivDe3SisteÅrene: convertBooleanOrUndefinedToYesOrNo(
            næring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        ),
        egenNæringYrkesAktivDato: næring.oppstartsdato || '',
        egenNæringHattVarigEndringDeSiste4Årene: convertBooleanOrUndefinedToYesOrNo(
            næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår,
        ),
        egenNæringVarigEndringDato: næring.varigEndringDato,
        egenNæringVarigEndringBeskrivelse: næring.varigEndringBeskrivelse,
        egenNæringVarigEndringInntektEtterEndring: næring.varigEndringInntektEtterEndring,
    };
};

export const mapNæringDataToSøkerState = (søker: Søker, values: EgenNæringFormData): Søker => {
    const næring = mapEgenNæringFormValuesToState(values);
    return {
        ...søker,
        selvstendigNæringsdrivendeInformasjon: næring,
    };
};

export const cleanupEgenNæringFormData = (
    values: EgenNæringFormData,
    visibility: QuestionVisibility<EgenNæringFormField>,
) => {
    const cleanedData: EgenNæringFormData = {
        ...values,
        egenNæringOrgnr: visibility.isVisible(EgenNæringFormField.egenNæringOrgnr)
            ? values.egenNæringOrgnr
            : initialEgenNæringFormData.egenNæringOrgnr,
        egenNæringLand: visibility.isVisible(EgenNæringFormField.egenNæringLand)
            ? values.egenNæringLand
            : initialEgenNæringFormData.egenNæringLand,
        egenNæringTom: visibility.isVisible(EgenNæringFormField.egenNæringTom)
            ? values.egenNæringTom
            : initialEgenNæringFormData.egenNæringTom,
        egenNæringResultat: visibility.isVisible(EgenNæringFormField.egenNæringResultat)
            ? values.egenNæringResultat
            : initialEgenNæringFormData.egenNæringResultat,
        egenNæringHattVarigEndringDeSiste4Årene: visibility.isVisible(
            EgenNæringFormField.egenNæringHattVarigEndringDeSiste4Årene,
        )
            ? values.egenNæringHattVarigEndringDeSiste4Årene
            : initialEgenNæringFormData.egenNæringHattVarigEndringDeSiste4Årene,
        egenNæringVarigEndringDato: visibility.isVisible(EgenNæringFormField.egenNæringVarigEndringDato)
            ? values.egenNæringVarigEndringDato
            : initialEgenNæringFormData.egenNæringVarigEndringDato,
        egenNæringVarigEndringBeskrivelse: visibility.isVisible(EgenNæringFormField.egenNæringVarigEndringBeskrivelse)
            ? values.egenNæringVarigEndringBeskrivelse
            : initialEgenNæringFormData.egenNæringVarigEndringBeskrivelse,
        egenNæringVarigEndringInntektEtterEndring: visibility.isVisible(
            EgenNæringFormField.egenNæringVarigEndringInntektEtterEndring,
        )
            ? values.egenNæringVarigEndringInntektEtterEndring
            : initialEgenNæringFormData.egenNæringVarigEndringInntektEtterEndring,
        egenNæringBlittYrkesaktivDe3SisteÅrene: visibility.isVisible(
            EgenNæringFormField.egenNæringBlittYrkesaktivDe3SisteÅrene,
        )
            ? values.egenNæringBlittYrkesaktivDe3SisteÅrene
            : initialEgenNæringFormData.egenNæringBlittYrkesaktivDe3SisteÅrene,
        egenNæringYrkesAktivDato: visibility.isVisible(EgenNæringFormField.egenNæringYrkesAktivDato)
            ? values.egenNæringYrkesAktivDato
            : initialEgenNæringFormData.egenNæringYrkesAktivDato,
    };
    return cleanedData;
};
