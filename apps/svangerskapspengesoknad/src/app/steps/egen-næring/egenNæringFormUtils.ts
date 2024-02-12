import { EgenNæringFormData } from './egenNæringFormConfig';
import { EgenNæring } from 'app/types/EgenNæring';
import dayjs from 'dayjs';
import { date4YearsAgo } from 'app/utils/dateUtils';
import { replaceInvisibleCharsWithSpace } from '@navikt/fp-common/src/common/utils/stringUtils';
import { hasValue } from 'app/utils/validationUtils';

export const erVirksomhetRegnetSomNyoppstartet = (oppstartsdato: Date | undefined): boolean => {
    if (!oppstartsdato) {
        return true;
    }

    return dayjs(oppstartsdato).startOf('day').isAfter(date4YearsAgo, 'day');
};

export const mapEgenNæringFormValuesToState = (formValues: EgenNæringFormData): EgenNæring => {
    const hattVarigEndring = formValues.egenNæringHattVarigEndringDeSiste4Årene;
    return {
        næringstype: formValues.egenNæringType,
        tidsperiode: {
            fom: formValues.egenNæringFom,
            tom: formValues.egenNæringTom,
        },
        pågående: formValues.egenNæringPågående!,
        næringsinntekt: hasValue(formValues.egenNæringResultat) ? formValues.egenNæringResultat : undefined,
        navnPåNæringen: replaceInvisibleCharsWithSpace(formValues.egenNæringNavn),
        organisasjonsnummer: hasValue(formValues.egenNæringOrgnr.trim())
            ? formValues.egenNæringOrgnr.trim()
            : undefined,
        registrertINorge: formValues.egenNæringRegistrertINorge!,
        registrertILand: hasValue(formValues.egenNæringLand) ? formValues.egenNæringLand : undefined,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: formValues.egenNæringBlittYrkesaktivDe3SisteÅrene,
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

export const getInitialEgenNæringFormValues = (næring: EgenNæring | undefined): EgenNæringFormData | undefined => {
    if (næring === undefined) {
        return undefined;
    }

    return {
        egenNæringType: næring.næringstype,
        egenNæringNavn: næring.navnPåNæringen || '',
        egenNæringRegistrertINorge: næring.registrertINorge,
        egenNæringLand: næring.registrertILand || '',
        egenNæringFom: næring.tidsperiode.fom,
        egenNæringTom: næring.tidsperiode.tom,
        egenNæringOrgnr: næring.organisasjonsnummer || '',
        egenNæringPågående: næring.pågående,
        egenNæringResultat: næring.næringsinntekt || '',
        egenNæringBlittYrkesaktivDe3SisteÅrene: næring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        egenNæringYrkesAktivDato: næring.oppstartsdato || '',
        egenNæringHattVarigEndringDeSiste4Årene: næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår,
        egenNæringVarigEndringDato: næring.varigEndringDato,
        egenNæringVarigEndringBeskrivelse: næring.varigEndringBeskrivelse,
        egenNæringVarigEndringInntektEtterEndring: næring.varigEndringInntektEtterEndring,
    };
};
