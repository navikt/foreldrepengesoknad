import * as moment from 'moment';
import { Tidsperiode } from 'common/types';

export const harTidsperiodeOverlapp = (
    tidsperiode: Tidsperiode,
    andreTidsperioder: Tidsperiode[]
) =>
    andreTidsperioder.some((t: Tidsperiode) => {
        const startdato = moment(tidsperiode.startdato).startOf('day');
        const sluttdato = moment(tidsperiode.sluttdato).endOf('day');

        return (
            startdato.isBetween(t.startdato, t.sluttdato) ||
            sluttdato.isBetween(t.startdato, t.sluttdato) ||
            (startdato.isBefore(t.startdato) &&
                sluttdato.isSameOrAfter(t.startdato)) ||
            (sluttdato.isAfter(t.sluttdato) &&
                startdato.isSameOrBefore(t.sluttdato))
        );
    });
