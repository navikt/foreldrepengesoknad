import {
    barnetErUnder15årPåAdopsjonsdato,
    erIUke22Pluss3,
    erMindreEnn3UkerSiden,
    etterDagensDato,
    hasValue,
    intlUtils,
} from '@navikt/fp-common';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { isDateABeforeDateB } from 'app/utils/dateUtils';
import { isISODateString } from '@navikt/ds-datepicker';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

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

    if (dayjs.utc(fødselsdato).isBefore(dayjs.utc(new Date()).subtract(3, 'years').subtract(4, 'months'), 'day')) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn3År3MndTilbake');
    }

    return undefined;
};

export const validateFødselsdatoAdopsjon = (intl: IntlShape) => (fødselsdato: string, adopsjonsdato: string) => {
    if (!hasValue(fødselsdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.fødselsdato.duMåOppgi');
    }

    if (!isISODateString(fødselsdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat');
    }

    if (etterDagensDato(fødselsdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere');
    }

    if (isDateABeforeDateB(adopsjonsdato, fødselsdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.fødselsdato.måVæreFørAdopsjonsdato');
    }

    if (!barnetErUnder15årPåAdopsjonsdato(fødselsdato, adopsjonsdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn15År3MndTilbake');
    }

    return undefined;
};

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

export const validateTermindatoFødsel = (fødselsdato: string, intl: IntlShape) => (termindato: string) => {
    if (!hasValue(termindato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.termindato.duMåOppgi');
    }

    if (!isISODateString(termindato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.termindato.ugyldigDatoFormat');
    }

    if (!dayjs.utc(termindato).subtract(6, 'months').isSameOrBefore(dayjs.utc(fødselsdato), 'day')) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.termindato.forLangtFremITid');
    }
    if (!dayjs.utc(termindato).add(1, 'months').isSameOrAfter(dayjs.utc(fødselsdato), 'day')) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.termindato.forLangtTilbakeITid');
    }

    return undefined;
};

export const validateAdopsjonsdato = (intl: IntlShape) => (adopsjonsdato: string) => {
    if (!hasValue(adopsjonsdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.adopsjonsdato.duMåOppgi');
    }

    if (!isISODateString(adopsjonsdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.adopsjonsdato.ugyldigDatoFormat');
    }

    return undefined;
};

export const validateAnkomstdato = (intl: IntlShape) => (ankomstdato: string, fødselsdato: string) => {
    if (!hasValue(ankomstdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.ankomstDato.duMåOppgi');
    }

    if (!isISODateString(ankomstdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.ankomstDato.ugyldigDatoFormat');
    }

    if (fødselsdato !== undefined && !dayjs.utc(fødselsdato).isSameOrBefore(dayjs.utc(ankomstdato), 'day')) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.ankomstDato.førFødselsdato');
    }

    return undefined;
};

export const validateTerminbekreftelse = (intl: IntlShape) => (terminbekreftelseDato: string) => {
    if (!hasValue(terminbekreftelseDato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.terminbekreftelseDato.duMåOppgi');
    }

    if (!isISODateString(terminbekreftelseDato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.terminbekreftelseDato.ugyldigDatoFormat');
    }

    if (dayjs.utc().isBefore(dayjs.utc(terminbekreftelseDato))) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.terminbekreftelseDato.kanIkkeVæreFremITid');
    }

    return undefined;
};
