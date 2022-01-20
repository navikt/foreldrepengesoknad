import {
    barnetErUnder15årPåAdopsjonsdato,
    erIUke22Pluss3,
    erMindreEnn3UkerSiden,
    etterDagensDato,
    hasValue,
    intlUtils,
} from '@navikt/fp-common';
import dayjs from 'dayjs';
import { isISODateString } from 'nav-datovelger';
import { IntlShape } from 'react-intl';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { isDateABeforeDateB } from 'app/utils/dateUtils';

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
};

export const validateTermindatoFødsel = (intl: IntlShape) => (termindato: string) => {
    if (!hasValue(termindato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.termindato.duMåOppgi');
    }

    if (!isISODateString(termindato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.termindato.ugyldigDatoFormat');
    }

    if (!dayjs().add(9, 'months').isSameOrAfter(dayjs(termindato), 'day')) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.termindato.forLangtFremITid');
    }
};

export const validateAdopsjonsdato = (intl: IntlShape) => (adopsjonsdato: string) => {
    if (!hasValue(adopsjonsdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.adopsjonsdato.duMåOppgi');
    }

    if (!isISODateString(adopsjonsdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.adopsjonsdato.ugyldigDatoFormat');
    }
};

export const validateAnkomstdato = (intl: IntlShape) => (ankomstdato: string, fødselsdato: string) => {
    if (!hasValue(ankomstdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.ankomstDato.duMåOppgi');
    }

    if (!isISODateString(ankomstdato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.ankomstDato.ugyldigDatoFormat');
    }

    if (!dayjs(fødselsdato).isSameOrBefore(ankomstdato, 'day')) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.ankomstDato.førFødselsdato');
    }
};

export const validateTerminbekreftelse = (intl: IntlShape) => (terminbekreftelseDato: string) => {
    if (!hasValue(terminbekreftelseDato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.terminbekreftelseDato.duMåOppgi');
    }

    if (!isISODateString(terminbekreftelseDato)) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.terminbekreftelseDato.ugyldigDatoFormat');
    }

    if (dayjs().isBefore(dayjs(terminbekreftelseDato))) {
        return intlUtils(intl, 'valideringsfeil.omBarnet.terminbekreftelseDato.kanIkkeVæreFremITid');
    }
};
