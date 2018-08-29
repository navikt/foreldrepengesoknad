import { Avgrensninger } from 'nav-datovelger';
import { date1YearAhead, today } from '../values';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntl } from 'react-intl';
import * as moment from 'moment';
import { Tidsperiode } from 'common/types';
import { harTidsperiodeOverlapp } from '../common/dateIntervals';

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
    fom: Date | undefined,
    tom: Date | undefined,
    ugyldigePerioder: Tidsperiode[],
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    const fradatoM = moment(fom);
    const tildatoM = moment(tom);

    return [
        {
            test: () => fom !== undefined,
            failText: getMessage(intl, `${intlKey}.senere`)
        },
        {
            test: () => fradatoM.isBetween(today, date1YearAhead.endOf('day')),
            failText: getMessage(intl, `${intlKey}.senere`)
        },
        {
            test: () => (tom ? fradatoM.startOf('day').isSameOrBefore(tildatoM) : true),
            failText: getMessage(intl, `${intlKey}.førTilDato`)
        },
        {
            test: () => (fom && tom ? !harTidsperiodeOverlapp({ fom, tom }, ugyldigePerioder) : true),
            failText: getMessage(intl, `${intlKey}.overlapp`)
        }
    ];
};

export const getSenereUtenlandsoppholdTildatoRegler = (
    fom: Date | undefined,
    tom: Date | undefined,
    ugyldigePerioder: Tidsperiode[],
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    const startM = moment(tom);
    const sluttM = moment(fom);

    return [
        {
            test: () => fom !== undefined,
            failText: getMessage(intl, `${intlKey}.senere`)
        },
        {
            test: () => sluttM.isBetween(today, date1YearAhead.endOf('day')),
            failText: getMessage(intl, `${intlKey}.senere`)
        },
        {
            test: () => (tom ? sluttM.endOf('day').isSameOrAfter(startM) : true),
            failText: getMessage(intl, `${intlKey}.etterFraDato`)
        },
        {
            test: () => (fom && tom ? !harTidsperiodeOverlapp({ fom, tom }, ugyldigePerioder) : true),
            failText: getMessage(intl, `${intlKey}.overlapp`)
        }
    ];
};
