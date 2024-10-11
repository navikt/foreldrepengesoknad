import { HolidaysTypes } from 'date-holidays';

import { TidsperiodeDate } from '@navikt/fp-common';
import { Uttaksdagen, isValidTidsperiodeString } from '@navikt/fp-utils';

import { getOffentligeFridager } from './fridagerUtils';

export const getUttaksdagerSomErFridager = (tidsperiode: TidsperiodeDate): HolidaysTypes.Holiday[] => {
    return isValidTidsperiodeString(tidsperiode)
        ? getOffentligeFridager(tidsperiode).filter((dag) => Uttaksdagen(new Date(dag.date)).erUttaksdag())
        : [];
};
