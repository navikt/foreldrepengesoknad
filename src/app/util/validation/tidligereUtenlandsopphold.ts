import { date1YearAgo, today } from './values';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import InjectedIntl = ReactIntl.InjectedIntl;
import { PeriodeAvgrensninger, Tidsperiode } from 'common/types/index';
import {
    dateIs1YearBeforeAtEarliestRule,
    dateIsSameOrAfterRule,
    dateIsSameOrBeforeRule,
    hasValueRule,
    timeintervalsDoNotOverlapRule
} from './common';
import { DateValue } from '../../types/common';

export const getFraAvgrensninger = (tilDate?: Date): PeriodeAvgrensninger => {
    const maksDato = tilDate || today.toDate();
    return {
        minDato: date1YearAgo.toDate(),
        maksDato
    };
};

export const getTilAvgrensninger = (fraDate?: Date): PeriodeAvgrensninger => {
    const minDato = fraDate || today.toDate();
    return {
        minDato,
        maksDato: today.toDate()
    };
};

export const getTidligereUtenlandsoppholdFradatoRegler = (
    fom: DateValue,
    tom: DateValue,
    ugyldigePerioder: Tidsperiode[],
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    return [
        hasValueRule(fom, getMessage(intl, `${intlKey}.tidligere`)),
        dateIs1YearBeforeAtEarliestRule(fom, getMessage(intl, `${intlKey}.tidligere`)),
        dateIsSameOrBeforeRule(fom, tom, getMessage(intl, `${intlKey}.førTilDato`)),
        timeintervalsDoNotOverlapRule({ fom, tom }, ugyldigePerioder, getMessage(intl, `${intlKey}.overlapp`))
    ];
};

export const getTidligereUtenlandsoppholdTildatoRegler = (
    tom: DateValue,
    fom: DateValue,
    ugyldigePerioder: Tidsperiode[],
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';

    return [
        hasValueRule(tom, getMessage(intl, `${intlKey}.tidligere`)),
        dateIs1YearBeforeAtEarliestRule(tom, getMessage(intl, `${intlKey}.tidligere`)),
        dateIsSameOrAfterRule(tom, fom, getMessage(intl, `${intlKey}.etterFraDato`)),
        timeintervalsDoNotOverlapRule({ fom, tom }, ugyldigePerioder, getMessage(intl, `${intlKey}.overlapp`))
    ];
};
