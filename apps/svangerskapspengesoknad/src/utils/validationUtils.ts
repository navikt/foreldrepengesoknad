import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { IntlShape } from 'react-intl';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';

dayjs.extend(minMax);

export const TEXT_INPUT_MIN_LENGTH = 10;
export const TEXT_INPUT_MAX_LENGTH = 1000;

export const hasValue = (v: string | number | boolean | undefined | null) => v !== '' && v !== undefined && v !== null;

export const getMinInputTilOgMedValue = (fom: string | undefined, otherMinDate: string) => {
    let min = otherMinDate;
    if (fom && hasValue(fom)) {
        const minDayjs = dayjs.max([dayjs(otherMinDate), dayjs(fom)]).format(ISO_DATE_FORMAT);
        min = minDayjs ?? otherMinDate;
    }
    return min;
};

export const getSlutteTekst = (sluttDatoArbeid: string, intl: IntlShape) => {
    return dayjs().isBefore(dayjs(sluttDatoArbeid), 'd')
        ? intl.formatMessage({ id: 'slutter' })
        : intl.formatMessage({ id: 'sluttet' });
};
