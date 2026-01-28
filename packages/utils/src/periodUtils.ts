import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { TIDENES_ENDE } from '@navikt/fp-constants';

import { formatDate } from './dateUtils';

type PeriodFormatOptions = {
    separator?: string;
    showTodayString?: boolean;
};

export const periodFormat = (fom: string, tom: string | undefined, intl: IntlShape, options?: PeriodFormatOptions) => {
    const { separator = '-', showTodayString = false } = options ?? {};
    const fomFormatted = formatDate(fom);
    const tomFormatted = formaterTomDato(tom, showTodayString, intl);
    return `${fomFormatted} ${separator} ${tomFormatted}`;
};

const formaterTomDato = (tom: string | undefined, showTodayString: boolean, intl: IntlShape) => {
    if (!tom && showTodayString) {
        return intl.formatMessage({ id: 'periodLabel.dateToday' });
    }
    if (!tom || dayjs(tom).isSame(TIDENES_ENDE, 'day')) {
        return '';
    }
    return formatDate(tom);
};
