import { formatDate, intlUtils } from '@navikt/fp-common';
import { getNumberFromNumberInputValue } from '@navikt/sif-common-formik-ds/lib';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

export const validateAntallUkerFellesperiode = (intl: IntlShape, dagerMedFellesperiode: number) => (value: string) => {
    const valueNumber = getNumberFromNumberInputValue(value)!;
    const maxValueUker = dagerMedFellesperiode / 5;
    if (valueNumber < 0) {
        return intlUtils(intl, 'fordeling.antallUker.forLiten');
    }

    if (valueNumber > maxValueUker) {
        return intlUtils(intl, 'fordeling.antallUker.forStor', { maxValue: maxValueUker });
    }

    return undefined;
};

export const validateOppstartsdato =
    (intl: IntlShape, minDato: Date | undefined, maxDato: Date | undefined) => (value: string) => {
        if (minDato && dayjs(value).isBefore(minDato, 'd')) {
            return intlUtils(intl, 'fordeling.oppstartsdato.forTidlig', { minDate: formatDate(minDato) });
        }

        if (maxDato && dayjs(value).isAfter(maxDato, 'd')) {
            return intlUtils(intl, 'fordeling.oppstartsdato.forSent', { maxDate: formatDate(maxDato) });
        }

        return undefined;
    };
