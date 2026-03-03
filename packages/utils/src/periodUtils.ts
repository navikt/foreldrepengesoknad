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

const formatDateShortMonthWithYear = (date: string): string => dayjs(date).format('D. MMM YYYY');

const getFormatter = (useShortYear: boolean, useShortMonth: boolean) => {
    if (useShortYear) {
        return formatDateShortYear;
    }
    if (useShortMonth) {
        return formatDateShortMonthWithYear;
    }
    return formatDate;
};

export const periodFormat = (fom: string, tom: string | undefined, intl: IntlShape, options?: PeriodFormatOptions) => {
    const { separator = '-', showTodayString = false, useShortMonth = false, useShortYear = false } = options ?? {};
    const formatter = getFormatter(useShortYear, useShortMonth);
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
