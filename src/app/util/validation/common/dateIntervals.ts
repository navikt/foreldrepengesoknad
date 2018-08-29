import * as moment from 'moment';
import { Tidsperiode } from 'common/types';

export const harTidsperiodeOverlapp = (tidsperiode: Tidsperiode, andreTidsperioder: Tidsperiode[]) =>
    andreTidsperioder.some((t: Tidsperiode) => {
        const fom = moment(tidsperiode.fom).startOf('day');
        const tom = moment(tidsperiode.tom).endOf('day');

        return (
            fom.isBetween(t.fom, t.tom) ||
            tom.isBetween(t.fom, t.tom) ||
            (fom.isBefore(t.fom) && tom.isSameOrAfter(t.fom)) ||
            (tom.isAfter(t.tom) && fom.isSameOrBefore(t.tom))
        );
    });
