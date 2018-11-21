import moment from 'moment';
import { getFraAvgrensninger, getTilAvgrensninger } from '../tidligereUtenlandsopphold';
import { date1YearAgo, today } from '../values';

describe('Tidligere utenlandsopphold-avgrensninger', () => {
    describe('getFraAvgrensninger', () => {
        it('should set minDato to date 1 year ago', () => {
            const minDato = moment(getFraAvgrensninger().minDato);
            expect(moment(minDato).isSame(date1YearAgo, 'day')).toBe(true);
        });

        it('should set maksDato to tilDato if specified', () => {
            const tilDato = moment().add(24, 'hours');
            const maksDato = moment(getFraAvgrensninger(tilDato.toDate()).maksDato);
            expect(moment(maksDato).isSame(tilDato, 'day')).toBe(true);
        });

        it('should set maksDato to todays date if tilDato is not specified', () => {
            const maksDato = moment(getFraAvgrensninger().maksDato);
            expect(moment(maksDato).isSame(today, 'day')).toBe(true);
        });
    });

    describe('getTilAvgrensninger', () => {
        it('should set maksDato to todays date', () => {
            const maksDato = moment(getTilAvgrensninger().maksDato);
            expect(today.isSame(maksDato, 'day')).toBe(true);
        });

        it('should set minDato to fraDato if specified', () => {
            const fraDato = moment().subtract(24, 'hours');
            const minDato = moment(getTilAvgrensninger(fraDato.toDate()).minDato);
            expect(minDato.isSame(fraDato, 'day')).toBe(true);
        });

        it('should set minDato to todays date if fraDato is not specified', () => {
            const maksDato = moment(getTilAvgrensninger().maksDato);
            expect(moment(maksDato).isSame(today, 'day')).toBe(true);
        });
    });
});
