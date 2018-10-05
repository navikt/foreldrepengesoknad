import moment from 'moment';
import { Avgrensninger } from 'nav-datovelger';
import { date1YearAgo, today } from '../values';
import { Validator } from 'common/lib/validation/types/index';
import getMessage from 'common/util/i18nUtils';
import InjectedIntl = ReactIntl.InjectedIntl;
import { Tidsperiode } from 'common/types';
import { harTidsperiodeOverlapp } from '../common/dateIntervals';
import { dateIs1YearBeforeAtEarliest, valueIsDefinedRule } from './common';

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
    return [
        valueIsDefinedRule(fom, getMessage(intl, `${intlKey}.tidligere`)),
        dateIs1YearBeforeAtEarliest(fom, getMessage(intl, `${intlKey}.tidligere`)),
        {
            test: () =>
                tom
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

export const getTidligereUtenlandsoppholdTildatoRegler = (
    fom: Date | undefined,
    tom: Date | undefined,
    ugyldigePerioder: Tidsperiode[],
    intl: InjectedIntl
): Validator[] => {
    const intlKey = 'valideringsfeil.utenlandsopphold';
    return [
        valueIsDefinedRule(tom, getMessage(intl, `${intlKey}.tidligere`)),
        dateIs1YearBeforeAtEarliest(tom, getMessage(intl, `${intlKey}.tidligere`)),
        {
            test: () =>
                tom
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
