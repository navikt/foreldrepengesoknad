import moment from 'moment';
import { Avgrensninger } from 'nav-datovelger/src/datovelger/types/index';
import { Validator } from 'common/lib/validation/types';
import { Fødselsdato } from '../../types/common';

export const fødselsdatoAvgrensninger: Avgrensninger = {
    minDato: moment()
        .subtract(3, 'years')
        .startOf('day')
        .toDate(),
    maksDato: moment()
        .endOf('day')
        .toDate()
};

export const getFødselsdatoRegler = (fødselsdato: Fødselsdato): Validator[] => {
    const date = moment(fødselsdato);
    const tomorrow = moment().add(1, 'days');
    const date3YearsAgo = moment()
        .subtract(3, 'years')
        .startOf('day');

    return [
        {
            test: () => fødselsdato !== undefined,
            failText: 'Du må oppgi en fødselsdato'
        },
        {
            test: () => date.isBefore(tomorrow),
            failText: 'Fødselsdato må være i dag eller tidligere'
        },
        {
            test: () => date.isSameOrAfter(date3YearsAgo),
            failText: 'Kan ikke være født for mer enn 3 år siden'
        }
    ];
};
