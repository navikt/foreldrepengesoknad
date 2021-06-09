import {
    barnetErUnder15årPåAdopsjonsdato,
    erIUke22Pluss3,
    erMindreEnn3UkerSiden,
    etterDagensDato,
    hasValue,
} from '@navikt/fp-common';
import dayjs from 'dayjs';
import { isISODateString } from 'nav-datovelger';
import { IntlShape } from 'react-intl';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const validateFødselsdato = (intl: IntlShape) => (fødselsdato: string) => {
    if (!hasValue(fødselsdato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.duMåOppgi' });
    }

    if (!isISODateString(fødselsdato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat' });
    }

    if (etterDagensDato(fødselsdato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere' });
    }

    return undefined;
};

export const validateFødselsdatoAdopsjon = (intl: IntlShape) => (fødselsdato: string, adopsjonsdato: string) => {
    if (!hasValue(fødselsdato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.duMåOppgi' });
    }

    if (!isISODateString(fødselsdato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat' });
    }

    if (etterDagensDato(fødselsdato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere' });
    }

    if (!barnetErUnder15årPåAdopsjonsdato(fødselsdato, adopsjonsdato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn15År3MndTilbake' });
    }

    return undefined;
};

export const validateTermindato = (intl: IntlShape) => (termindato: string) => {
    if (!hasValue(termindato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.duMåOppgi' });
    }

    if (!isISODateString(termindato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.ugyldigDatoFormat' });
    }

    if (!erMindreEnn3UkerSiden(termindato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.forTidlig' });
    }

    if (!erIUke22Pluss3(termindato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.duMåVæreIUke22' });
    }
};

export const validateTermindatoFødsel = (intl: IntlShape) => (termindato: string) => {
    if (!hasValue(termindato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.duMåOppgi' });
    }

    if (!isISODateString(termindato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.ugyldigDatoFormat' });
    }

    if (!dayjs().add(9, 'months').isSameOrAfter(dayjs(termindato), 'day')) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.termindato.forLangtFremITid' });
    }
};

export const validateAdopsjonsdato = (intl: IntlShape) => (adopsjonsdato: string) => {
    if (!hasValue(adopsjonsdato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.adopsjonsdato.duMåOppgi' });
    }

    if (!isISODateString(adopsjonsdato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.adopsjonsdato.ugyldigDatoFormat' });
    }
};

export const validateAnkomstdato = (intl: IntlShape) => (ankomstdato: string, fødselsdato: string) => {
    if (!hasValue(ankomstdato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.ankomstDato.duMåOppgi' });
    }

    if (!isISODateString(ankomstdato)) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.ankomstDato.ugyldigDatoFormat' });
    }

    if (!dayjs(fødselsdato).isSameOrBefore(ankomstdato, 'day')) {
        return intl.formatMessage({ id: 'valideringsfeil.omBarnet.ankomstDato.førFødselsdato' });
    }
};
