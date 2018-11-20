import fødselsdatoUtils from './../fødselsdato';
import DateValues from '../../validation/values';

const trimFødselsdatoer = fødselsdatoUtils.trimFødselsdatoer;
const todaysDate = DateValues.today.toDate();

describe('trimFødselsdatoer', () => {
    it('should ensure the number of dates correspond to the number of children', () => {
        expect(trimFødselsdatoer(2, [todaysDate, todaysDate, todaysDate]).length).toBe(2);
    });

    it('should set missing date values to undefined if number of children is greater than number of dates', () => {
        const dates = trimFødselsdatoer(3, [todaysDate, todaysDate]);
        expect(dates[0]).toBe(todaysDate);
        expect(dates[1]).toBe(todaysDate);
        expect(dates[2]).toBeUndefined();
    });

    it('should return list as is if number of children and dates are the same', () => {
        const dates = trimFødselsdatoer(2, [todaysDate, todaysDate]);
        expect(dates[0]).toBe(todaysDate);
        expect(dates[1]).toBe(todaysDate);
        expect(dates).toHaveLength(2);
    });
});
