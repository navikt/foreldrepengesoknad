import { isISODateString } from '@navikt/ds-datepicker';
import { formatDate, hasValue, intlUtils, validateTextInputField } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validateDatoForAleneomsorg =
    (intl: IntlShape, familiehendelsedato: dayjs.Dayjs) => (datoForAleneomsorg: string) => {
        if (!hasValue(datoForAleneomsorg)) {
            return intlUtils(intl, 'valideringsfeil.annenForelder.datoForAleneomsorg.duMåOppgi');
        }

        if (!isISODateString(datoForAleneomsorg)) {
            return intlUtils(intl, 'valideringsfeil.annenForelder.datoForAleneomsorg.ugyldigDatoFormat');
        }

        if (dayjs(datoForAleneomsorg).isBefore(familiehendelsedato, 'day')) {
            return intlUtils(intl, 'valideringsfeil.annenForelder.datoForAleneomsorg.førFamiliehendelsedato', {
                dato: formatDate(familiehendelsedato.toDate()),
            });
        }

        return undefined;
    };

export const validateFornavn = (intl: IntlShape, label: string, kanIkkeOppgis?: boolean) => (fornavn: string) => {
    if (!kanIkkeOppgis && (!hasValue(fornavn) || fornavn.trim() === '')) {
        return intlUtils(intl, 'valideringsfeil.annenForelder.fornavnPåkrevd');
    }

    return validateTextInputField(fornavn, label, intl);
};

export const validateEtternavn = (intl: IntlShape, label: string, kanIkkeOppgis?: boolean) => (etternavn: string) => {
    if (!kanIkkeOppgis && (!hasValue(etternavn) || etternavn.trim() === '')) {
        return intlUtils(intl, 'valideringsfeil.annenForelder.etternavnPåkrevd');
    }
    return validateTextInputField(etternavn, label, intl);
};
