import * as commonRules from '../common';
import * as getMessage from 'common/util/i18nUtils';
import { today } from '../values';
import { getFrilansOppstartRules } from '../frilans';
import { IntlShape } from 'react-intl';
const intl = {} as IntlShape;

const todaysDate = today.toDate();
const someString = '';

describe('Frilans oppstartsdato validation', () => {
    beforeEach(() => {
        (getMessage.default as any) = jest.fn(() => someString);
        (commonRules as any).hasValueRule = jest.fn();
        (commonRules as any).dateIsNotInFutureRule = jest.fn();
    });

    it('should call correct validators with given date and string', () => {
        getFrilansOppstartRules(todaysDate, intl);
        expect(commonRules.hasValueRule).toHaveBeenCalledWith(todaysDate, expect.any(String));
        expect(commonRules.dateIsNotInFutureRule).toHaveBeenCalledWith(todaysDate, expect.any(String));
    });
});
