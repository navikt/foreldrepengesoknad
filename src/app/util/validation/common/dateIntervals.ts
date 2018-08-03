import * as moment from 'moment';
import { Tidsperiode } from 'common/types';

export const harTidsperiodeOverlapp = (
    tidsperiode: Tidsperiode,
    andreTidsperioder: Tidsperiode[]
) =>
    andreTidsperioder.some(
        (currentTidsperiode: Tidsperiode) =>
            moment(tidsperiode.startdato)
                .startOf('day')
                .isBetween(
                    currentTidsperiode.startdato,
                    currentTidsperiode.sluttdato
                ) ||
            moment(tidsperiode.sluttdato)
                .endOf('day')
                .isBetween(
                    currentTidsperiode.startdato,
                    currentTidsperiode.sluttdato
                )
    );
