import moment from 'moment';
import { Validator } from 'common/lib/validation/types';
import { today, tomorrow } from '../values';
import { Avgrensninger } from 'nav-datovelger';

export const valueIsDefinedRule = (v: any, failText: string): Validator => ({
    test: () => v !== undefined,
    failText
});

export const dateIsNotInFutureRule = (date: Date | undefined, failText: string): Validator => ({
    test: () => moment(date).isBefore(tomorrow),
    failText
});

export const notInFutureAvgrensning: Avgrensninger = {
    maksDato: today.toDate()
};
