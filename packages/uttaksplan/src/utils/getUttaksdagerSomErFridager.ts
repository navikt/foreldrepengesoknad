import { HolidaysTypes } from 'date-holidays';
import dayjs from 'dayjs';

import { TidsperiodeDate } from '@navikt/fp-common';
import { Uttaksdagen } from '@navikt/fp-utils';

import { getOffentligeFridager } from './fridagerUtils';

export const getUttaksdagerSomErFridager = (tidsperiode: TidsperiodeDate): HolidaysTypes.Holiday[] => {
    return isValidTidsperiodeString(tidsperiode)
        ? getOffentligeFridager(tidsperiode).filter((dag) => Uttaksdagen(new Date(dag.date)).erUttaksdag())
        : [];
};

interface TidsperiodeDate2 {
    fom?: Date;
    tom?: Date;
}

export function isValidTidsperiodeString(tidsperiode?: TidsperiodeDate2): tidsperiode is TidsperiodeDate {
    return (
        tidsperiode !== undefined &&
        tidsperiode.fom !== undefined &&
        tidsperiode.tom !== undefined &&
        dayjs(tidsperiode.fom).isSameOrBefore(tidsperiode.tom, 'day')
    );
}
