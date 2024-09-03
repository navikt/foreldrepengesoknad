import { HolidaysTypes } from 'date-holidays';

import { TidsperiodeDate } from '@navikt/fp-common';
import { Uttaksdagen, isValidTidsperiode } from '@navikt/fp-utils';

import { getOffentligeFridager } from './fridagerUtils';

export const ANTALL_UTTAKSDAGER_SEKS_UKER = 30;

export const getUttaksdagerSomErFridager = (tidsperiode: TidsperiodeDate): HolidaysTypes.Holiday[] => {
    return isValidTidsperiode(tidsperiode)
        ? getOffentligeFridager(tidsperiode).filter((dag) => Uttaksdagen(new Date(dag.date)).erUttaksdag())
        : [];
};
