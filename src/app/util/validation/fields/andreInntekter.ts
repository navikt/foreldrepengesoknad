import DateValues from '../values';
import { Tidsperiode, Avgrensninger } from 'nav-datovelger';
import { DatoAvgrensninger } from '../../../bolker/TidsperiodeBolk';

export const getAndreInntekterTidsperiodeAvgrensninger = (
    tidsperiode?: Partial<Tidsperiode>
): DatoAvgrensninger => {
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

export const getTidsperiodeAvgrensningerSiste4år = (): Avgrensninger => {
    const maksDato = DateValues.today.toDate();
    const minDato = DateValues.today.subtract(4, 'years').toDate();
    return {
        minDato,
        maksDato
    };
};
