import moment from 'moment';
import { Avgrensninger } from 'nav-datovelger';
import { date1YearAgo, today } from '../values';
import { Validator } from 'common/lib/validation/types';
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
    startdato: Date | undefined,
    sluttdato: Date | undefined,
    ugyldigePerioder: Tidsperiode[],
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    const startM = moment(startdato);
    const sluttM = moment(sluttdato);

    return [
        {
            test: () => startdato !== undefined,
            failText: getMessage(intl, `${intlKey}.tidligere`)
        },
        {
            test: () => startM.isBetween(date1YearAgo, today.endOf('day')),
            failText: getMessage(intl, `${intlKey}.tidligere`)
        },
        {
            test: () =>
                sluttdato ? startM.startOf('day').isSameOrBefore(sluttM) : true,
            failText: getMessage(intl, `${intlKey}.førTilDato`)
        },
        {
            test: () =>
                startdato && sluttdato
                    ? !harTidsperiodeOverlapp(
                          { startdato, sluttdato },
                          ugyldigePerioder
                      )
                    : true,
            failText: getMessage(intl, `${intlKey}.overlapp`)
        }
    ];
};

export const getTidligereUtenlandsoppholdTildatoRegler = (
    startdato: Date | undefined,
    sluttdato: Date | undefined,
    ugyldigePerioder: Tidsperiode[],
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    const startM = moment(sluttdato);
    const sluttM = moment(startdato);

    return [
        {
            test: () => startdato !== undefined,
            failText: getMessage(intl, `${intlKey}.tidligere`)
        },
        {
            test: () => sluttM.isBetween(date1YearAgo, today.endOf('day')),
            failText: getMessage(intl, `${intlKey}.tidligere`)
        },
        {
            test: () =>
                sluttdato ? sluttM.endOf('day').isSameOrAfter(startM) : true,
            failText: getMessage(intl, `${intlKey}.etterFraDato`)
        },
        {
            test: () =>
                startdato && sluttdato
                    ? !harTidsperiodeOverlapp(
                          { startdato, sluttdato },
                          ugyldigePerioder
                      )
                    : true,
            failText: getMessage(intl, `${intlKey}.overlapp`)
        }
    ];
};
