import { InjectedIntl } from 'react-intl';
import * as getMessage from 'common/util/i18nUtils';
import { getTermindatoRegler } from '../termindato';
import { date21DaysAgo, date22DaysAgo, fjortenUkerPluss3, fjortenUkerPluss4, today } from '../../values';
import * as commonRules from '../common';

const intl = {} as InjectedIntl;
const callIkkeMerEnn3UkerSiden = (termindato: Date) => getTermindatoRegler(termindato, intl)[1].test();
const callIUke26Pluss3 = (termindato: Date) => getTermindatoRegler(termindato, intl)[2].test();

const someString = '';
const todaysDate = today.toDate();

describe('Termindato validation', () => {
    beforeEach(() => {
        (getMessage.default as any) = jest.fn(() => someString);
        (commonRules as any).hasValueRule = jest.fn();
    });

    it('should call correct validators with given date and string', () => {
        getTermindatoRegler(todaysDate, intl);
        expect(commonRules.hasValueRule).toHaveBeenCalledWith(todaysDate, someString);
    });

    describe('Specific rules', () => {
        it('should be invalid if it is more than 3 weeks ago', () => {
            expect(callIkkeMerEnn3UkerSiden(date22DaysAgo.toDate())).toBe(false);
        });

        it('should be invalid if it is too late for applicant to be in uke26+3', () => {
            expect(callIUke26Pluss3(fjortenUkerPluss4.toDate())).toEqual(false);
        });

        it('should return true if date is valid', () => {
            expect(callIkkeMerEnn3UkerSiden(date21DaysAgo.toDate())).toEqual(true);
            expect(callIUke26Pluss3(fjortenUkerPluss3.toDate())).toEqual(true);
        });
    });
});
