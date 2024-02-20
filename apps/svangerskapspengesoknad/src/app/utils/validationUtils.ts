import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { IntlShape } from 'react-intl';

dayjs.extend(minMax);

export const TEXT_INPUT_MIN_LENGTH = 10;
export const TEXT_INPUT_MAX_LENGTH = 1000;

export const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

export const getMinInputTilOgMedValue = (fom: string | undefined, otherMinDate: Date) => {
    let min = otherMinDate;
    if (fom && hasValue(fom)) {
        const minDayjs = dayjs.max([dayjs(otherMinDate), dayjs(fom)]);
        min = minDayjs ? minDayjs.toDate() : otherMinDate;
    }
    return min;
};

export const getSlutteTekst = (sluttDatoArbeid: string, intl: IntlShape) => {
    return dayjs().isBefore(dayjs(sluttDatoArbeid), 'd')
        ? intl.formatMessage({ id: 'slutter' })
        : intl.formatMessage({ id: 'sluttet' });
};
