import { getFødselsdatoRegler } from '../fødselsdato';
import { IntlShape } from 'react-intl';
import * as getMessage from 'common/util/i18nUtils';
import * as commonRules from '../common';
import { today } from '../values';
const intl = {} as IntlShape;

const todaysDate = today.toDate();
const someString = '';

describe('Fødselsdato validation', () => {
    beforeEach(() => {
        (getMessage.default as any) = jest.fn(() => someString);
        (commonRules as any).hasValueRule = jest.fn();
        (commonRules as any).dateIsNotInFutureRule = jest.fn();
        (commonRules as any).dateIs3YearsAgoOrLaterRule = jest.fn();
        (commonRules as any).dateIs15YearsAnd3MonthsAgoOrLaterRule = jest.fn();
    });

    it('should call correct validators with given date and string', () => {
        getFødselsdatoRegler(todaysDate, false, intl);
        expect(commonRules.hasValueRule).toHaveBeenCalledWith(todaysDate, expect.any(String));
        expect(commonRules.dateIsNotInFutureRule).toHaveBeenCalledWith(todaysDate, expect.any(String));
        expect(commonRules.dateIs3YearsAgoOrLaterRule).toHaveBeenCalledWith(todaysDate, expect.any(String));
    });

    it('should call correct validators with given date, gjelderAdopsjon and string', () => {
        getFødselsdatoRegler(todaysDate, true, intl);
        expect(commonRules.hasValueRule).toHaveBeenCalledWith(todaysDate, expect.any(String));
        expect(commonRules.dateIsNotInFutureRule).toHaveBeenCalledWith(todaysDate, expect.any(String));
        expect(commonRules.dateIs15YearsAnd3MonthsAgoOrLaterRule).toHaveBeenCalledWith(todaysDate, expect.any(String));
    });
});
