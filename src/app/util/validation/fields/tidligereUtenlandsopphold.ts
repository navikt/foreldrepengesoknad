import moment from 'moment';
import { Avgrensninger } from 'nav-datovelger';
import { date1YearAgo, today } from '../values';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import InjectedIntl = ReactIntl.InjectedIntl;
import { Tidsperiode } from 'common/types';
import { harTidsperiodeOverlapp } from '../common/dateIntervals';

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
    fom: Date | undefined,
    tom: Date | undefined,
    ugyldigePerioder: Tidsperiode[],
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    const startM = moment(fom);
    const sluttM = moment(tom);

    return [
        {
            test: () => fom !== undefined,
            failText: getMessage(intl, `${intlKey}.tidligere`)
        },
        {
            test: () => startM.isBetween(date1YearAgo, today.endOf('day')),
            failText: getMessage(intl, `${intlKey}.tidligere`)
        },
        {
            test: () => (tom ? startM.startOf('day').isSameOrBefore(sluttM) : true),
            failText: getMessage(intl, `${intlKey}.førTilDato`)
        },
        {
            test: () => (fom && tom ? !harTidsperiodeOverlapp({ fom, tom }, ugyldigePerioder) : true),
            failText: getMessage(intl, `${intlKey}.overlapp`)
        }
    ];
};

export const getTidligereUtenlandsoppholdTildatoRegler = (
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
            failText: getMessage(intl, `${intlKey}.tidligere`)
        },
        {
            test: () => sluttM.isBetween(date1YearAgo, today.endOf('day')),
            failText: getMessage(intl, `${intlKey}.tidligere`)
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
