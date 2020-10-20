import fødselsdatoUtils from './../fødselsdato';
import DateValues from '../../validation/values';
import { createDatoInputVerdiFromDate } from '../../../../common/components/skjema/elements/dato-input/datoInputUtils';

const trimFødselsdatoer = fødselsdatoUtils.trimFødselsdatoer;
const todaysDateInputVerdi = createDatoInputVerdiFromDate(DateValues.today.toDate());

describe('trimFødselsdatoer', () => {
    it('should ensure the number of dates correspond to the number of children', () => {
        expect(trimFødselsdatoer(2, [todaysDateInputVerdi, todaysDateInputVerdi, todaysDateInputVerdi]).length).toBe(2);
    });

    it('should set missing date values to undefined if number of children is greater than number of dates', () => {
        const dates = trimFødselsdatoer(3, [todaysDateInputVerdi, todaysDateInputVerdi]);
        expect(dates[0]).toBe(todaysDateInputVerdi);
        expect(dates[1]).toBe(todaysDateInputVerdi);
        expect(dates[2]).toBeUndefined();
    });

    it('should return list as is if number of children and dates are the same', () => {
        const dates = trimFødselsdatoer(2, [todaysDateInputVerdi, todaysDateInputVerdi]);
        expect(dates[0]).toBe(todaysDateInputVerdi);
        expect(dates[1]).toBe(todaysDateInputVerdi);
        expect(dates).toHaveLength(2);
    });
});
