import { Periode } from '../../../types/uttaksplan/periodetyper';
import { dateIs3WeeksOrMoreFromNow } from 'app/util/dates/dates';

export const uttaksplanStarterMerEnnTreUkerFremITid = (perioder: Periode[]): boolean => {
    if (perioder.length === 0) {
        return false;
    }

    const førstePeriodeStart = perioder[0].tidsperiode.fom;

    return dateIs3WeeksOrMoreFromNow(førstePeriodeStart);
};
