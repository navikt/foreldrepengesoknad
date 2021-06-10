import { formatDate, hasValue, intlUtils } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { isISODateString } from 'nav-datovelger';
import { IntlShape } from 'react-intl';

export const validateDatoForAleneomsorg = (intl: IntlShape, familiehendelsedato: dayjs.Dayjs) => (
    datoForAleneomsorg: string
) => {
    if (!hasValue(datoForAleneomsorg)) {
        return intlUtils(intl, 'valideringsfeil.annenForelder.datoForAleneomsorg.duMåOppgi');
    }

    if (!isISODateString(datoForAleneomsorg)) {
        return intlUtils(intl, 'valideringsfeil.annenForelder.datoForAleneomsorg.ugyldigDatoFormat');
    }

    if (dayjs(datoForAleneomsorg).isBefore(familiehendelsedato)) {
        return intlUtils(intl, 'valideringsfeil.annenForelder.datoForAleneomsorg.førFamiliehendelsedato', {
            dato: formatDate(familiehendelsedato.toDate()),
        });
    }

    return undefined;
};

export const validateFornavn = (intl: IntlShape, kanIkkeOppgis?: boolean) => (fornavn: string) => {
    if (!kanIkkeOppgis && !hasValue(fornavn)) {
        return intlUtils(intl, 'valideringsfeil.annenForelder.fornavnPåkrevd');
    }

    return undefined;
};

export const validateEtternavn = (intl: IntlShape, kanIkkeOppgis?: boolean) => (etternavn: string) => {
    if (!kanIkkeOppgis && !hasValue(etternavn)) {
        return intlUtils(intl, 'valideringsfeil.annenForelder.etternavnPåkrevd');
    }

    return undefined;
};
