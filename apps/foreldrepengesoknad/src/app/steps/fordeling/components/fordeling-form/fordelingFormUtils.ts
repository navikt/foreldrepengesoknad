import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { getNumberFromNumberInputValue } from '@navikt/fp-formik';
import { formatDate } from '@navikt/fp-utils';

export const validateAntallUkerFellesperiode = (intl: IntlShape, dagerMedFellesperiode: number) => (value: string) => {
    const valueNumber = getNumberFromNumberInputValue(value)!;
    const maxValueUker = dagerMedFellesperiode / 5;

    if (valueNumber === undefined || Math.round(valueNumber) !== valueNumber) {
        return intl.formatMessage({ id: 'fordeling.antallUker.ugyldigFormat' });
    }

    if (valueNumber < 0) {
        return intl.formatMessage({ id: 'fordeling.antallUker.forLiten' });
    }

    if (valueNumber > maxValueUker) {
        return intl.formatMessage({ id: 'fordeling.antallUker.forStor' }, { maxValue: maxValueUker });
    }

    return undefined;
};

export const validateOppstartsdato =
    (intl: IntlShape, minDato: Date | undefined, maxDato: Date | undefined) => (value: string) => {
        if (minDato && dayjs(value).isBefore(minDato, 'd')) {
            return intl.formatMessage({ id: 'fordeling.oppstartsdato.forTidlig' }, { minDato: formatDate(minDato) });
        }

        if (maxDato && dayjs(value).isAfter(maxDato, 'd')) {
            return intl.formatMessage({ id: 'fordeling.oppstartsdato.forSent' }, { maxDato: formatDate(maxDato) });
        }

        return undefined;
    };
