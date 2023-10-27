import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);

export const TEXT_INPUT_MIN_LENGTH = 10;
export const TEXT_INPUT_MAX_LENGTH = 1000;

export const hasValue = (v: any) => v !== '' && v !== undefined && v !== null && v !== YesOrNo.UNANSWERED;

export const getMinInputTilOgMedValue = (fom: string | undefined, otherMinDate: Date) => {
    let min = otherMinDate;
    if (fom && hasValue(fom)) {
        const minDayjs = dayjs.max([dayjs(otherMinDate), dayjs(fom)]);
        min = minDayjs ? minDayjs.toDate() : otherMinDate;
    }
    return min;
};
