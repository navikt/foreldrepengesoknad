import { ISOStringToDate, hasValue } from '@navikt/fp-common';
import { EgenNæringSubformData, initialEgenNæringSubformData } from './egenNæringSubformConfig';
import {
    convertBooleanOrUndefinedToYesOrNo,
    convertYesOrNoOrUndefinedToBoolean,
} from '@navikt/fp-common/src/common/utils/formUtils';
import { Næring } from 'app/types/Næring';
import dayjs from 'dayjs';
import { date4YearsAgo } from 'app/utils/dateUtils';
import { dateToISOString } from '@navikt/sif-common-formik-ds/lib';

export const erVirksomhetRegnetSomNyoppstartet = (oppstartsdato: Date | undefined): boolean => {
    if (!oppstartsdato) {
        return true;
    }

    return dayjs(oppstartsdato).startOf('day').isAfter(date4YearsAgo, 'day');
};

export const mapEgenNæringFormValuesToState = (formValues: Partial<EgenNæringSubformData>): Næring => {
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

export const getInitialEgenNæringSubformValues = (næring: Næring | undefined): EgenNæringSubformData => {
    if (næring === undefined) {
        return initialEgenNæringSubformData;
    }

    return {
        ...initialEgenNæringSubformData,
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
