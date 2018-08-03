import { Avgrensninger } from 'nav-datovelger';
import { date1YearAhead, today } from '../values';
import { Validator } from 'common/lib/validation/types';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntl } from 'react-intl';
import * as moment from 'moment';

export const getFraAvgrensninger = (tilDate?: Date): Avgrensninger => {
    const maksDato = tilDate || date1YearAhead.toDate();
    return {
        minDato: today.toDate(),
        maksDato
    };
};

export const getTilAvgrensninger = (fraDate?: Date): Avgrensninger => {
    const minDato = fraDate || today.toDate();
    return {
        minDato,
        maksDato: date1YearAhead.toDate()
    };
};

export const getSenereUtenlandsoppholdFradatoRegler = (
    fraDate: Date | undefined,
    tilDate: Date | undefined,
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    const fradatoM = moment(fraDate);
    const tildatoM = moment(tilDate);

    return [
        {
            test: () => fraDate !== undefined,
            failText: getMessage(intl, `${intlKey}.senere`)
        },
        {
            test: () => fradatoM.isBetween(today, date1YearAhead.endOf('day')),
            failText: getMessage(intl, `${intlKey}.senere`)
        },
        {
            test: () =>
                tilDate
                    ? fradatoM.startOf('day').isSameOrBefore(tildatoM)
                    : true,
            failText: getMessage(intl, `${intlKey}.førTilDato`)
        }
    ];
};

export const getSenereUtenlandsoppholdTildatoRegler = (
    tilDate: Date | undefined,
    fraDate: Date | undefined,
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    const fradatoM = moment(fraDate);
    const tildatoM = moment(tilDate);

    return [
        {
            test: () => tilDate !== undefined,
            failText: getMessage(intl, `${intlKey}.senere`)
        },
        {
            test: () => tildatoM.isBetween(today, date1YearAhead.endOf('day')),
            failText: getMessage(intl, `${intlKey}.senere`)
        },
        {
            test: () =>
                fraDate ? tildatoM.endOf('day').isSameOrAfter(fradatoM) : true,
            failText: getMessage(intl, `${intlKey}.etterFraDato`)
        }
    ];
};
