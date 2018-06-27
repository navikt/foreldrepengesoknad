import moment from 'moment';
import { Avgrensninger } from 'nav-datovelger/src/datovelger/types/index';
import { Validator } from 'common/lib/validation/types';

export const fødselsdatoAvgrensninger: Avgrensninger = {
    minDato: moment()
        .subtract(3, 'years')
        .startOf('day')
        .toDate(),
    maksDato: moment()
        .endOf('day')
        .toDate()
};

export const fødselsdatoRegler: Validator[] = [
    {
        test: () => {
            console.log('test', 1 !== 1);
            return false;
        },
        failText: 'failed'
    }
];
