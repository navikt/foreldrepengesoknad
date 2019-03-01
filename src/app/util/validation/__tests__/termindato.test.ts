import { InjectedIntl } from 'react-intl';
import * as getMessage from 'common/util/i18nUtils';
import { getTermindatoRegler } from '../termindato';
import { date21DaysAgo, date22DaysAgo, attenUkerPluss3, attenUkerPluss4, today } from '../values';
import * as commonRules from '../common';

const intl: Partial<InjectedIntl> = {};
const callIkkeMerEnn3UkerSiden = (termindato: Date) => {
    return getTermindatoRegler(termindato, intl as InjectedIntl)[1].test();
};
const callIUke22Pluss3 = (termindato: Date) => {
    return getTermindatoRegler(termindato, intl as InjectedIntl)[2].test();
};

const someString = '';
const todaysDate = today.toDate();

describe('Termindato validation', () => {
    beforeEach(() => {
        (getMessage.default as any) = jest.fn(() => someString);
        (commonRules as any).hasValueRule = jest.fn();
    });

    it('should call correct validators with given date and string', () => {
        getTermindatoRegler(todaysDate, intl as InjectedIntl);
        expect(commonRules.hasValueRule).toHaveBeenCalledWith(todaysDate, someString);
    });

    describe('Specific rules', () => {
        it('should be invalid if it is more than 3 weeks ago', () => {
            expect(callIkkeMerEnn3UkerSiden(date22DaysAgo.toDate())).toBe(false);
        });

        it('should be invalid if it is too late for applicant to be in uke22+3', () => {
            expect(callIUke22Pluss3(attenUkerPluss4.toDate())).toEqual(false);
        });

        it('should return true if date is valid', () => {
            expect(callIkkeMerEnn3UkerSiden(date21DaysAgo.toDate())).toEqual(true);
            expect(callIUke22Pluss3(attenUkerPluss3.toDate())).toEqual(true);
        });
    });
});
