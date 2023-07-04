import { isISODateString } from '@navikt/ds-datepicker';
import { erIUke22Pluss3, erMindreEnn3UkerSiden, etterDagensDato, hasValue, intlUtils } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validateTermindato = (intl: IntlShape) => (termindato: string, fødselsdato: string | undefined) => {
    if (!hasValue(termindato)) {
        return intlUtils(intl, 'valideringsfeil.barnet.termindato.duMåOppgi');
    }

    if (!isISODateString(termindato)) {
        return intlUtils(intl, 'valideringsfeil.barnet.termindato.ugyldigDatoFormat');
    }

    if (!erMindreEnn3UkerSiden(termindato)) {
        if (!hasValue(fødselsdato)) {
            return intlUtils(intl, 'valideringsfeil.barnet.termindato.forTidlig.fødselsdatoMangler');
        }
        return intlUtils(intl, 'valideringsfeil.barnet.termindato.forTidlig');
    }

    return undefined;
};

export const validateFødselsdato = (intl: IntlShape) => (fødselsdato: string) => {
    if (!hasValue(fødselsdato)) {
        return intlUtils(intl, 'valideringsfeil.barnet.fødselsdato.duMåOppgi');
    }

    if (!isISODateString(fødselsdato)) {
        return intlUtils(intl, 'valideringsfeil.barnet.fødselsdato.ugyldigDatoFormat');
    }

    if (etterDagensDato(fødselsdato)) {
        return intlUtils(intl, 'valideringsfeil.barnet.fødselsdato.måVæreIdagEllerTidligere');
    }

    if (dayjs(fødselsdato).isBefore(dayjs(new Date()).subtract(3, 'years').subtract(4, 'months'), 'day')) {
        return intlUtils(intl, 'valideringsfeil.barnet.termindato.forTidlig');
    }

    return undefined;
};
