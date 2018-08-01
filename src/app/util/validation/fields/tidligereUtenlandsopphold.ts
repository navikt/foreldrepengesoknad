import moment from 'moment';
import { Avgrensninger } from 'nav-datovelger';
import { date1YearAgo, today } from '../values';
import { Validator } from 'common/lib/validation/types';
import getMessage from 'common/util/i18nUtils';
import InjectedIntl = ReactIntl.InjectedIntl;

export const getFraAvgrensninger = (tilDate?: Date): Avgrensninger => {
    const maksDato = tilDate || today.toDate();
    return {
        minDato: date1YearAgo.toDate(),
        maksDato
    };
};

export const getTilAvgrensninger = (fraDate?: Date): Avgrensninger => {
    const minDato = fraDate || today.toDate();
    return {
        minDato,
        maksDato: today.toDate()
    };
};

export const getTidligereUtenlandsoppholdFradatoRegler = (
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
            failText: getMessage(intl, `${intlKey}.tidligere`)
        },
        {
            test: () => fradatoM.isBetween(date1YearAgo, today.endOf('day')),
            failText: getMessage(intl, `${intlKey}.tidligere`)
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

export const getTidligereUtenlandsoppholdTildatoRegler = (
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
            failText: getMessage(intl, `${intlKey}.tidligere`)
        },
        {
            test: () => tildatoM.isBetween(date1YearAgo, today.endOf('day')),
            failText: getMessage(intl, `${intlKey}.tidligere`)
        },
        {
            test: () =>
                fraDate ? tildatoM.endOf('day').isSameOrAfter(fradatoM) : true,
            failText: getMessage(intl, `${intlKey}.etterFraDato`)
        }
    ];
};
