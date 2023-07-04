import { isISODateString } from '@navikt/ds-datepicker';
import { erIUke22Pluss3, erMindreEnn3UkerSiden, etterDagensDato, hasValue, intlUtils } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validateTermindato = (intl: IntlShape) => (termindato: string) => {
    if (!hasValue(termindato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.termindato.duMåOppgi');
    }

    if (!isISODateString(termindato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.termindato.ugyldigDatoFormat');
    }

    if (!erMindreEnn3UkerSiden(termindato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.termindato.forTidlig');
    }

    if (!erIUke22Pluss3(termindato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.termindato.duMåVæreIUke22');
    }

    return undefined;
};

export const validateFødselsdato = (intl: IntlShape) => (fødselsdato: string) => {
    if (!hasValue(fødselsdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.fødselsdato.duMåOppgi');
    }

    if (!isISODateString(fødselsdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat');
    }

    if (etterDagensDato(fødselsdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere');
    }

    if (dayjs(fødselsdato).isBefore(dayjs(new Date()).subtract(3, 'years').subtract(4, 'months'), 'day')) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn3År3MndTilbake');
    }

    return undefined;
};
