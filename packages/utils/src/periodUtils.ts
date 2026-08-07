import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { TIDENES_ENDE } from '@navikt/fp-constants';

import { formatDate, formatDateShortYear } from './dateUtils';

type PeriodFormatOptions = {
    separator?: string;
    showTodayString?: boolean;
    useShortMonth?: boolean;
    useShortYear?: boolean;
};

const getFormatter = (useShortYear: boolean) => {
    if (useShortYear) {
        return formatDateShortYear;
    }
    return formatDate;
};

export const periodFormat = (fom: string, tom: string | undefined, intl: IntlShape, options?: PeriodFormatOptions) => {
    const { separator = '-', showTodayString = false, useShortMonth = false, useShortYear = false } = options ?? {};

    if (useShortMonth) {
        const formatShortMonth = (date: string) =>
            intl.formatDate(date, { day: 'numeric', month: 'short', year: 'numeric' });
        const fomFormatted = formatShortMonth(fom);
        const tomFormatted = formaterTomDato(tom, showTodayString, intl, formatShortMonth);
        return `${fomFormatted} ${separator} ${tomFormatted}`;
    }

    const formatter = getFormatter(useShortYear);
    const fomFormatted = formatter(fom);
    const tomFormatted = formaterTomDato(tom, showTodayString, intl, formatter);
    return `${fomFormatted} ${separator} ${tomFormatted}`;
};

const formaterTomDato = (
    tom: string | undefined,
    showTodayString: boolean,
    intl: IntlShape,
    formatter: (date: string) => string,
) => {
    if (!tom && showTodayString) {
        return intl.formatMessage({ id: 'periodLabel.dateToday' });
    }
    if (!tom || dayjs(tom).isSame(TIDENES_ENDE, 'day')) {
        return '';
    }
    return formatter(tom);
};
