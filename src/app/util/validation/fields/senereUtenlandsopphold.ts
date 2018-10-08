import { Avgrensninger } from 'nav-datovelger';
import { date1YearAhead, today } from '../values';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntl } from 'react-intl';
import * as moment from 'moment';
import { Tidsperiode } from 'common/types';
import { harTidsperiodeOverlapp } from '../common/dateIntervals';
import { dateIs1YearAheadAtLatest, hasValueRule } from './common';

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
    return [
        hasValueRule(fom, getMessage(intl, `${intlKey}.senere`)),
        dateIs1YearAheadAtLatest(fom, getMessage(intl, `${intlKey}.senere`)),
        {
            test: () =>
                fom && tom
                    ? moment(fom)
                          .startOf('day')
                          .isSameOrBefore(moment(tom))
                    : true,
            failText: getMessage(intl, `${intlKey}.førTilDato`)
        },
        {
            test: () => (fom && tom ? !harTidsperiodeOverlapp({ fom, tom }, ugyldigePerioder) : true),
            failText: getMessage(intl, `${intlKey}.overlapp`)
        }
    ];
};

export const getSenereUtenlandsoppholdTildatoRegler = (
    tom: Date | undefined,
    fom: Date | undefined,
    ugyldigePerioder: Tidsperiode[],
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    return [
        hasValueRule(tom, getMessage(intl, `${intlKey}.senere`)),
        dateIs1YearAheadAtLatest(tom, getMessage(intl, `${intlKey}.senere`)),
        {
            test: () =>
                fom && tom
                    ? moment(tom)
                          .endOf('day')
                          .isSameOrAfter(moment(fom))
                    : true,
            failText: getMessage(intl, `${intlKey}.etterFraDato`)
        },
        {
            test: () => (fom && tom ? !harTidsperiodeOverlapp({ fom, tom }, ugyldigePerioder) : true),
            failText: getMessage(intl, `${intlKey}.overlapp`)
        }
    ];
};
