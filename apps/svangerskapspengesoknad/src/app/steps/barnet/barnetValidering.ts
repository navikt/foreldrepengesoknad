import { isISODateString } from '@navikt/ds-datepicker';
import { etterDagensDato, intlUtils } from '@navikt/fp-common';
import { niMånederFremITid, etÅrSiden, enMånedSiden, halvannetÅrSiden } from 'app/utils/dateUtils';
import { hasValue } from 'app/utils/validationUtils';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validateTermindato = (intl: IntlShape, fødselsdato: string | undefined) => (termindato: string) => {
    if (!hasValue(termindato)) {
        return intlUtils(intl, 'valideringsfeil.barnet.termindato.duMåOppgi');
    }

    if (!isISODateString(termindato)) {
        return intlUtils(intl, 'valideringsfeil.barnet.termindato.ugyldigDatoFormat');
    }

    if (dayjs(termindato).isSameOrAfter(niMånederFremITid(new Date()))) {
        return intlUtils(intl, 'valideringsfeil.barnet.termindato.forLangtFremITid');
    }
    if (dayjs(termindato).isBefore(enMånedSiden(new Date())) && !fødselsdato) {
        return intlUtils(intl, 'valideringsfeil.barnet.termindato.vennligstOppgiBarnetsFødselsDato');
    }
    if (dayjs(termindato).isBefore(etÅrSiden(new Date()))) {
        return intlUtils(intl, 'valideringsfeil.barnet.termindato.forLangtTilbakeITid');
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

    if (dayjs(fødselsdato).isBefore(halvannetÅrSiden(new Date()))) {
        return intlUtils(intl, 'valideringsfeil.barnet.termindato.forLangtTilbakeITid');
    }

    return undefined;
};
