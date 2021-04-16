import { getFødselsdatoRegler } from '../fødselsdato';
import { IntlShape } from 'react-intl';
import * as getMessage from 'common/util/i18nUtils';
import * as commonRules from '../common';
import { today } from '../values';
import { dateToISOFormattedDateString } from 'common/util/datoUtils';
const intl = {} as IntlShape;

const todaysDateString = dateToISOFormattedDateString(today.toDate());
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
        getFødselsdatoRegler(todaysDateString, false, intl);
        expect(commonRules.hasValueRule).toHaveBeenCalled();
        expect(commonRules.dateIsNotInFutureRule).toHaveBeenCalled();
        expect(commonRules.dateIs3YearsAgoOrLaterRule).toHaveBeenCalled();
    });

    it('should call correct validators with given date, gjelderAdopsjon and string', () => {
        getFødselsdatoRegler(todaysDateString, true, intl);
        expect(commonRules.hasValueRule).toHaveBeenCalled();
        expect(commonRules.dateIsNotInFutureRule).toHaveBeenCalled();
        expect(commonRules.dateIs15YearsAnd3MonthsAgoOrLaterRule).toHaveBeenCalled();
    });
});
