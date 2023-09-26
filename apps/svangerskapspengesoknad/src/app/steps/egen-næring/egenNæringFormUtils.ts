import { ISOStringToDate, hasValue } from '@navikt/fp-common';
import { EgenNæringFormData, EgenNæringFormField, initialEgenNæringFormData } from './egenNæringFormConfig';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';
import { Næring } from 'app/types/Næring';
import dayjs from 'dayjs';
import { date4YearsAgo } from 'app/utils/dateUtils';
import { QuestionVisibility, dateToISOString } from '@navikt/sif-common-formik-ds/lib';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';
import { Søker } from 'app/types/Søker';

export const erVirksomhetRegnetSomNyoppstartet = (oppstartsdato: Date | undefined): boolean => {
    if (!oppstartsdato) {
        return true;
    }

    return dayjs(oppstartsdato).startOf('day').isAfter(date4YearsAgo, 'day');
};

export const mapEgenNæringFormValuesToState = (formValues: EgenNæringFormData): Næring => {
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
        navnPåNæringen: replaceInvisibleCharsWithSpace(formValues.egenNæringNavn!),
        organisasjonsnummer: hasValue(formValues.egenNæringOrgnr) ? formValues.egenNæringOrgnr : undefined,
        registrertINorge: convertYesOrNoOrUndefinedToBoolean(formValues.egenNæringRegistrertINorge)!,
        registrertILand: hasValue(formValues.egenNæringLand) ? formValues.egenNæringLand : undefined,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: convertYesOrNoOrUndefinedToBoolean(
            formValues.egenNæringBlittYrkesaktivDe3SisteÅrene,
        )!,
        oppstartsdato: ISOStringToDate(formValues.egenNæringYrkesAktivDato),
    };
};

export const getInitialEgenNæringFormValues = (næring: Næring | undefined): EgenNæringFormData => {
    if (næring === undefined) {
        return initialEgenNæringFormData;
    }

    return {
        ...initialEgenNæringFormData,
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
            næring?.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        ),
        egenNæringYrkesAktivDato: dateToISOString(næring?.oppstartsdato) || '',
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
    };
    return cleanedData;
};
