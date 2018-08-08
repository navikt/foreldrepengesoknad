import DateValues from '../values';
import { Tidsperiode } from 'nav-datovelger';

export const getAndreInntekterTidsperiodeAvgrensninger = (
    tidsperiode?: Partial<Tidsperiode>
) => {
    return {
        fra: {
            minDato: undefined,
            maksDato: DateValues.today.toDate()
        },
        til: {
            minDato:
                tidsperiode && tidsperiode.fom ? tidsperiode.fom : undefined,
            maksDato: DateValues.today.toDate()
        }
    };
};
