import DateValues from './values';
import { DatoAvgrensninger, Tidsperiode } from 'common/types';
import { DatoAvgrensninger } from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';

export const getAndreInntekterTidsperiodeAvgrensninger = (tidsperiode?: Partial<Tidsperiode>): DatoAvgrensninger => {
    return {
        fra: {
            minDato: undefined,
            maksDato: DateValues.today.toDate()
        },
        til: {
            minDato: tidsperiode && tidsperiode.fom ? tidsperiode.fom : undefined,
            maksDato: DateValues.today.toDate()
        }
    };
};

export const getTidsperiodeAvgrensningerSiste4år = (): DatoAvgrensninger => {
    return {
        minDato: DateValues.date4YearsAgo.toDate(),
        maksDato: DateValues.today.toDate()
    };
};
