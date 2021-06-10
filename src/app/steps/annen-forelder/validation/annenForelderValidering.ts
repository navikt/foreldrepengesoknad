import {
    hasValue,
} from '@navikt/fp-common';
import dayjs from 'dayjs';
import { isISODateString } from 'nav-datovelger';
import { IntlShape } from 'react-intl';

export const validateDatoForAleneomsorg = (intl: IntlShape, familiehendelsedato: dayjs.Dayjs) => (datoForAleneomsorg: string) => {
    if (!hasValue(datoForAleneomsorg)) {
        return intl.formatMessage({ id: 'valideringsfeil.annenForelder.datoForAleneomsorg.duMåOppgi' });
    }

    if (!isISODateString(datoForAleneomsorg)) {
        return intl.formatMessage({ id: 'valideringsfeil.annenForelder.datoForAleneomsorg.ugyldigDatoFormat' });
    }

    if (dayjs(datoForAleneomsorg).isBefore(familiehendelsedato)) {
        return intl.formatMessage({ id: 'valideringsfeil.annenForelder.datoForAleneomsorg.førFamiliehendelsedato' }, { dato: familiehendelsedato.format('DD.MM.YYYY') });
    }

    return undefined;
};

export const validateFornavn = (intl: IntlShape, kanIkkeOppgis?: boolean) => (fornavn: string) => {
    if (!kanIkkeOppgis && !hasValue(fornavn)) {
        return intl.formatMessage({ id: 'valideringsfeil.annenForelder.fornavnPåkrevd' });
    }

    return undefined;
};

export const validateEtternavn = (intl: IntlShape, kanIkkeOppgis?: boolean) => (etternavn: string) => {
    if (!kanIkkeOppgis && !hasValue(etternavn)) {
        return intl.formatMessage({ id: 'valideringsfeil.annenForelder.etternavnPåkrevd' });
    }

    return undefined;
};