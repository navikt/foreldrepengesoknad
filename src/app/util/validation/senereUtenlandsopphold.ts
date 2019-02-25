import { date1YearAhead, today } from './values';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntl } from 'react-intl';
import { PeriodeAvgrensninger, Tidsperiode } from 'common/types/index';
import {
    dateIs1YearAheadAtLatestRule,
    dateIsSameOrAfterRule,
    dateIsSameOrBeforeRule,
    hasValueRule,
    timeintervalsDoNotOverlapRule
} from './common';
import { DateValue } from '../../types/common';

export const getFraAvgrensninger = (tilDate?: Date): PeriodeAvgrensninger => {
    const maksDato = tilDate || date1YearAhead.toDate();
    return {
        minDato: today.toDate(),
        maksDato
    };
};

export const getTilAvgrensninger = (fraDate?: Date): PeriodeAvgrensninger => {
    const minDato = fraDate || today.toDate();
    return {
        minDato,
        maksDato: date1YearAhead.toDate()
    };
};

export const getSenereUtenlandsoppholdFradatoRegler = (
    fom: DateValue,
    tom: DateValue,
    ugyldigePerioder: Tidsperiode[],
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    return [
        hasValueRule(fom, getMessage(intl, `${intlKey}.senere`)),
        dateIs1YearAheadAtLatestRule(fom, getMessage(intl, `${intlKey}.senere`)),
        dateIsSameOrBeforeRule(fom, tom, getMessage(intl, `${intlKey}.førTilDato`)),
        timeintervalsDoNotOverlapRule({ fom, tom }, ugyldigePerioder, getMessage(intl, `${intlKey}.overlapp`))
    ];
};

export const getSenereUtenlandsoppholdTildatoRegler = (
    tom: DateValue,
    fom: DateValue,
    ugyldigePerioder: Tidsperiode[],
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    return [
        hasValueRule(tom, getMessage(intl, `${intlKey}.senere`)),
        dateIs1YearAheadAtLatestRule(tom, getMessage(intl, `${intlKey}.senere`)),
        dateIsSameOrAfterRule(tom, fom, getMessage(intl, `${intlKey}.etterFraDato`)),
        timeintervalsDoNotOverlapRule({ fom, tom }, ugyldigePerioder, getMessage(intl, `${intlKey}.overlapp`))
    ];
};
